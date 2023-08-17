import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEndpoint } from "@/stores/useEndpoint"

const ErrorMessages: Record<number, { fields: string[], message: string }> = {
    422: { fields: ["password", "username"], message: "Invalid credentials" },
    401: { fields: ["password", "username"], message: "Invalid credentials" },
}

export default function useLoginForm() {
    const router = useRouter();
    const { endpoint, setValue } = useEndpoint()

    const form = useForm({
        resolver: yupResolver(yup.object().shape({
            endpoint: yup.string().required(),
            username: yup.string().required(),
            password: yup.string().required(),
        })),
        defaultValues: {
            endpoint: endpoint ?? "",
            username: "",
            password: "",
        }
    })

    const login = form.handleSubmit(async (data) => {
        const payload = await signIn("credentials", { ...data, redirect: false })
        if (!payload) return

        const error = ErrorMessages[payload.status]

        if (!payload.ok && error) {
            return error.fields.forEach((field: any) => form.setError(field, { message: error.message }))
        }

        setValue(data.endpoint)
        return router.replace("/apps")
    })

    return {
        form,
        login
    }
}

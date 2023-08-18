import { useEndpoint } from "@/stores/useEndpoint";
import api from "@/utils/api";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import { useSession } from "next-auth/react";


type MutationOptions = {
    appId: string;
    type: "reload" | "restart" | "stop";
}

export default function useAppControl(): UseMutationResult<unknown, unknown, MutationOptions> {
    const session = useSession()
    const endpoint = useEndpoint(state => state.endpoint)
    if (!session.data) throw new Error('Authenticated wrapper required')

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: ({ type, appId }) => {
            return api.post(`${endpoint}/apps/${appId}/${type}`, {}, {
                headers: {
                    Authorization: `Bearer ${session.data?.user?.token}`
                }
            });
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(["APP", { appId: String(variables.appId) }])
            await queryClient.invalidateQueries(["APPS"])
        }
    })
}

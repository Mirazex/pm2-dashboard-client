import { useEndpoint } from "@/stores/useEndpoint";
import api from "@/utils/api";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type MutationType = "create" | "update" | "delete";

const MutationMethodByType = {
    create: "post",
    update: "patch",
    delete: "delete"
}

type TMutationProps = {
    path: string;
    queryKey: string | string[];
    type?: MutationType;
    requiredAuth?: boolean;
}

export default function useMutationItem({ path, queryKey, type = "create", requiredAuth = true }: TMutationProps): UseMutationResult {
    const session = useSession()
    const endpoint = useEndpoint(state => state.endpoint)
    if (requiredAuth && !session.data) throw new Error('Authenticated wrapper required')

    const queryClient = useQueryClient();

    const queryString = Array.isArray(queryKey) ? queryKey : [queryKey]

    return useMutation({
        mutationFn: (data: any) => {
            const method = MutationMethodByType[type] as "post" | "patch" | "delete";
            const url = type === "create" ? `${path}` : `${path}/${data.id}`

            if (method === "delete") return api.delete(`${endpoint}{url}`, {
                headers: {
                    Authorization: `Bearer ${session.data?.user?.token}`
                }
            })

            return api[method](`${endpoint}{url}`, data, {
                headers: {
                    Authorization: `Bearer ${session.data?.user?.token}`
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries([...queryString])
        }
    })
}

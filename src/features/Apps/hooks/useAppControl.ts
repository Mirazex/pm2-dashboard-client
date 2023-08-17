import { useEndpoint } from "@/stores/useEndpoint";
import api from "@/utils/api";
import {UseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import { useSession } from "next-auth/react";


type TMutationProps = {
    queryKey: string | string[];
}

type MutationOptions = {
    appId: string;
    type: "reload" | "restart" | "stop";
}

export default function useAppControl({ queryKey }: TMutationProps): UseMutationResult<unknown, unknown, MutationOptions> {
    const session = useSession()
    const endpoint = useEndpoint(state => state.endpoint)
    if (!session.data) throw new Error('Authenticated wrapper required')

    const queryClient = useQueryClient();

    const queryString = Array.isArray(queryKey) ? queryKey : [queryKey];

    return useMutation({
        mutationFn: ({ type, appId }) => {
            return api.post(`${endpoint}/apps/${appId}/${type}`, {}, {
                headers: {
                    Authorization: `Bearer ${session.data?.authorization?.token}`
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries([...queryString])
        }
    })
}

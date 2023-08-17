import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import getApps from "../api/getApps";
import { useEndpoint } from "@/stores/useEndpoint";

export default function useApps() {
    const { data } = useSession()
    const endpoint = useEndpoint(state => state.endpoint)

    return useQuery(['APPS'], () => getApps({
        endpoint: endpoint as string,
        accessToken: data?.authorization.token as string,
    }))
}

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useEndpoint } from "@/stores/useEndpoint";
import getAppDetails from "../api/getAppDetails";
import { useRouter } from "next/router";

export default function useAppDetails() {
    const { data } = useSession()
    const router = useRouter()
    const endpoint = useEndpoint(state => state.endpoint)

    return useQuery(['APP', { appId: router.query.appId }], () => getAppDetails({
        endpoint: endpoint as string,
        accessToken: data?.user.token as string,
        appId: router.query.appId as string
    }))
}

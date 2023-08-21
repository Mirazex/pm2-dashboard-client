import { useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEndpoint } from "@/stores/useEndpoint";
import { useRouter } from "next/router";
import getLogByType from "../api/getLogByType";

export default function useLogs({ limit = 30 }) {
    const endpoint = useEndpoint((state: any) => state.endpoint);
    const session = useSession();
    const router = useRouter();

    if (!session.data) throw new Error("Authenticated wrapper required");

    const { data, ...options } = useInfiniteQuery({
        queryKey: ["APP_LOGS", { appId: String(router.query.appId), type: (router.query.type as any) ?? "logs" }, { limit }],
        queryFn: ({ pageParam }) =>  getLogByType({
            endpoint: endpoint as string,
            accessToken: session.data?.user.token as string,
            appId: router.query.appId as string,
            type: (router.query.type as any) ?? "logs",
            limit,
            nextKey: pageParam ?? 0,
        }),
        staleTime: Infinity,
        getNextPageParam: (lastPage) => {
            if (lastPage.nextKey <= 0) return
            return lastPage.nextKey;
        }
    })

    return {
        pages: data?.pages ?? [],
        items: data?.pages?.map((page) => page.lines).reverse().flat() ?? [],
        ...options
    }
}

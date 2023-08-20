import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import getApps from "../api/getApps";
import cookies from "universal-cookie"
import getAppDetails from "../api/getAppDetails";
import getLogByType from "@/features/Logs/api/getLogByType";

export async function loadAppDetails(ctx: any) {
    const endpoint = new cookies(ctx.req.headers.cookie).get("endpoint")
    const queryClient = new QueryClient();
    const session = await getSession(ctx)
    if (!session?.user.token) return {
        props: {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    let isError = false;

    try {
        await queryClient.fetchQuery(['APP', { appId: ctx.params.appId }], () => getAppDetails({
            endpoint: endpoint,
            accessToken: session?.user.token,
            appId: ctx.params.appId
        }));
    } catch (error: any) {
        isError = true
        ctx.res.statusCode = error?.status;
    }

    return {
        props: {
            isError,
            dehydratedState: dehydrate(queryClient),
            session
        },
    }
}

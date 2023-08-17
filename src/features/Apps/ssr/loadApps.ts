import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import getApps from "../api/getApps";
import cookies from "universal-cookie"

export async function loadApps(ctx: any) {
    const endpoint = new cookies(ctx.req.headers.cookie).get("endpoint")
    const queryClient = new QueryClient();
    const session = await getSession(ctx)
    if (!session?.authorization.token) return {
        props: {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    let isError = false;

    try {
        await queryClient.fetchQuery(['APPS'], () => getApps({
            endpoint: endpoint,
            accessToken: session?.authorization.token,
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

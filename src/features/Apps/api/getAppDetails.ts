import api from "@/utils/api";
import { signOut } from "next-auth/react";

type TRequestOptions = {
    endpoint: string
    accessToken: string;
    appId: string;
}

export default async function getAppDetails(options: TRequestOptions) {
    try {
        const response = await api.get(`${options.endpoint}/apps/${options.appId}`, {
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
            },
        });

        return response.data.data;
    } catch (e: any) {
        console.log(e)
        if (e.response.data.code === 5) {
            console.log(signOut())
        }

        throw e.response
    }
}



import api from "@/utils/api";
import { signOut } from "next-auth/react";

type TRequestOptions = {
    endpoint: string
    accessToken: string;
}

export default async function getApps(options: TRequestOptions) {
    try {
        const response = await api.get(`${options.endpoint}/apps`, {
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
            },
        });

        return response.data.data as Application[];
    } catch (e: any) {
        console.log(e)
        if (e.response.data.code === 5) {
            console.log(signOut())
        }

        throw e.response
    }
}



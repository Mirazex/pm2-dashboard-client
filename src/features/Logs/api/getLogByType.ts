import api from "@/utils/api";
import { signOut } from "next-auth/react";

type TRequestOptions = {
    endpoint: string
    accessToken: string;
    appId: string;
    type: keyof typeof Types;
    limit: number;
    nextKey: number;
}

const Types = {
    logs: "stdout",
    errors: "stderr"
} as const

export default async function getLogByType(options: TRequestOptions) {
    try {
        const response = await api.get(`${options.endpoint}/apps/${options.appId}/logs/${Types[options.type]}?lineCount=${options.limit}&nextKey=${options.nextKey}`, {
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



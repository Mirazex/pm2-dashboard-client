import api from "@/utils/api";

export default async function loginAdmin(credentials: { username?: string, password?: string, server: string }) {
    try {
        const response = await api.post(`${credentials.server}/auth/login`, {
            username: credentials?.username,
            password: credentials?.password,
        });

        const data = response.data.data
        data.endpoint = credentials.server

        if (data.token) {
            return data;
        }

        return null;
    } catch (e: any) {
        throw new Error(e.response.status ?? "Failed auth request");
    }
}

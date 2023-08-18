import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            endpoint: string;
            token: string;
            expire: number;
        };
    }
}

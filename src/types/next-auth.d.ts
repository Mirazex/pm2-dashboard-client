import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        authorization: {
            endpoint: string;
            token: string;
            expire: number;
        };
    }
}

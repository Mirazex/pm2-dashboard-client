import loginAdmin from "@/features/Auth/api/loginAdmin";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const providers: NextAuthOptions["providers"] = [
    CredentialsProvider({
        name: "Credentials",
        type: "credentials",
        credentials: {
            endpoint: {
                label: "Endpoint",
                type: "text",
                placeholder: "http://localhost:3000",
            },
            username: {
                label: "Username",
                type: "username",
                placeholder: "type devops username",
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "********",
            },
        },
        async authorize(credentials) {
            return await loginAdmin({
                server: credentials?.endpoint || "",
                username: credentials?.username,
                password: credentials?.password,
            });
        },
    }),
];

const callbacks: NextAuthOptions["callbacks"] = {
    async jwt({ token, user }: any) {
        if (!token.authorization) {
            token.authorization = {};
        }

        if (user) {
            token.authorization = user
        }

        const shouldRefreshTime = Math.round(token.authorization.expire - 60 * 60 * 1000 - Date.now());
        if (shouldRefreshTime > 0) return token;

        return token;
    },
    session({ session, token }) {
        session.authorization = token.authorization as any;

        return session;
    },
};

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers,
    callbacks,
    pages: {
        signIn: "/auth/login",
        signOut: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

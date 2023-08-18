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
    async jwt({ token, user, account }: any) {
        if (account && user) {
            console.log("Initial sign in", {account, user})
            return { user }
        }


        if (Date.now() < token.user.expire) {
            console.log("Token is not expired", Date.now(), token.user.expire)
            return token;
        }

        console.log("Token is expired", token.user.expire)
        return { user }
    },
    session({ session, token }) {
        session.user = token.user as any;

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

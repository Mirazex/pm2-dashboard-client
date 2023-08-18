import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/apps/:path*", "/auth/:path*", "/"],
};

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const isAuth = !!req.nextauth.token?.user?.token;

        if (req.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL(!isAuth ? "/auth/login" : "/apps", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/apps") && !isAuth) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/auth/login") && isAuth) {
            return NextResponse.redirect(new URL("/apps", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            }
        },
        pages: {
            signIn: "/auth/login",
            signOut: "/",
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
);

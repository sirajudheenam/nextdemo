import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/app/admin/lib/jwt_auth";

const AUTH_PAGES = ["/admin/jwt/login"];

const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {

    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("admin_jwt_token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            response.cookies.delete("admin_jwt_token");
            return response;
        }
        const response = NextResponse.redirect(new URL(`/admin/jwt`, url));
        return response;
    }

    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next", nextUrl.pathname);
        const response = NextResponse.redirect(
            new URL(`/admin/jwt/login?${searchParams}`, url)
        );
        response.cookies.delete("admin_jwt_token");
        return response;
    }

    return NextResponse.next();

}
export const config = { matcher: ["/admin/jwt/login", "/admin/jwt/protected/:path*"] };
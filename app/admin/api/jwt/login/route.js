import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/app/admin/lib/jwt_auth";

export async function POST(request) {
    const body = await request.json();
    if (body.username === "admin" && body.password === "admin") {
        const admin_jwt_token = await new SignJWT({
            username: body.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30s")
            .sign(getJwtSecretKey());
        console.log("admin_jwt_token: " + admin_jwt_token);
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        response.cookies.set({
            name: "admin_jwt_token",
            value: admin_jwt_token,
            path: "/admin/jwt",
        });
        return response;
    }
    return NextResponse.json({ success: false });
}
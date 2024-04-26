"use client";
import React from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/app/admin/lib/jwt_auth";

export function useAuth() {
    const [auth, setAuth] = React.useState(null);

    const getVerifiedtoken = async () => {
        const cookies = new Cookies();
        const admin_jwt_token = cookies.get("admin_jwt_token") ?? null;
        const verifiedToken = await verifyJwtToken(admin_jwt_token);
        setAuth(verifiedToken);
    };
    React.useEffect(() => {
        getVerifiedtoken();
    }, []);
    return auth;
}
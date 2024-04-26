"use client";

import { useAuth } from "@/app/admin/hooks/useAuth";
import Link from "next/link";
export default function Home() {
    const auth = useAuth();
    return <>
        <h1>Public Home Page</h1>
        <header>
            <nav>
                {auth ? (
                    <p>logged in</p>
                ) : (
                    <Link href="/admin/jwt/login">Login</Link>
                )}
            </nav>
        </header>
    </>;
}
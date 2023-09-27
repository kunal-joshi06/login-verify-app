import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;

    const isPublic = path === "/login" || path === "/signup" || path === "/verifyEmail" || path ==="/forgotPassword";

    const token = request.cookies.get('token')?.value || "";

    if(isPublic && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }


    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/",
        "/signup",
        "/login",
        "/profile/:path*",
        // "/verifyEmail",
        "/profile"
    ]
}
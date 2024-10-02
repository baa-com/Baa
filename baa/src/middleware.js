import { NextResponse } from "next/server";
import { decodeAndVerifySignature } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/home"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const cookie = cookies().get("session")?.value;
	const session = await decodeAndVerifySignature(cookie);

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	if (
		isPublicRoute &&
		session?.userId &&
		!req.nextUrl.pathname.startsWith("/home")
	) {
		return NextResponse.redirect(new URL("/home", req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

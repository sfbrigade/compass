import { NextRequest, NextResponse } from "next/server";

/**
 * Our API routes are already protected, this middleware applies to UI routes like /students.
 * If a user isn't logged in, we redirect them to sign-in.
 * This **does not** check for the validity of the session, only that a cookie exists; so it shouldn't be generally used to protect routes.
 *
 * Ideally we would use NextAuth's built-in Next.js middleware: https://next-auth.js.org/configuration/nextjs#middleware
 * However, their middleware doesn't yet work with database sessions.
 */
export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("__Secure-next-auth.session-token");

  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signInPage";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!img|_next|api|signInPage|about).*)"] };

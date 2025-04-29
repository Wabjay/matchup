import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ Allow access to the login page
  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  // ❌ If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Profile completion check (redirect to /profile if needed)
  if (token.profileDone === false && token.profileSkipped !== true && !req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/update-profile", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/jobs/:path*"], // Adjust as needed
};

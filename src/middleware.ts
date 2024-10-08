import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isOnboarded =
    !!token?.profile?.firstName &&
    !!token?.profile?.lastName &&
    token?.profile?.member !== null;
  const isAdmin = token?.profile?.role === "admin";

  const fromUrl = req.nextUrl.pathname;
  const isAuthPage = fromUrl.startsWith("/auth");
  const isOnboardingPage = fromUrl.startsWith("/onboarding");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    }

    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isOnboardingPage && isOnboarded) {
    return NextResponse.redirect(new URL("/sessions", req.url));
  }

  if (!isOnboardingPage && !isOnboarded) {
    return NextResponse.redirect(new URL("/onboarding/name", req.url));
  }

  if (fromUrl === "/admin" && !isAdmin) {
    return NextResponse.redirect(new URL("/sessions", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)",
    "/admin/:path*",
    "/sessions/:path*",
    "/booking-confirmation/:path*",
    "/onboarding/:path*",
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
  ],
};

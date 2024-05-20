import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { is } from "drizzle-orm";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isOnboarded =
    (token?.profile?.firstName !== null &&
      token?.profile?.lastName !== null &&
      token?.profile?.member !== null) ||
    (!!token?.profile?.firstName &&
      !!token?.profile?.lastName &&
      !!token?.profile?.member);

  const fromUrl = req.nextUrl.pathname;
  const isAuthPage =
    fromUrl.startsWith("/auth/login") || fromUrl.startsWith("/auth/signup");
  const isOnboardPage = fromUrl.startsWith("/onboard");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    }

    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isOnboardPage) {
    if (isOnboarded) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    }
  }

  if (!isOnboardPage && !isOnboarded) {
    return NextResponse.redirect(new URL("/onboard/name", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)"],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  //print out the token first name
  console.log((token?.profile as { firstName: string })?.firstName);
  const fromUrl = req.nextUrl.pathname;
  const isAuthPage =
    fromUrl.startsWith("/auth/login") || fromUrl.startsWith("/auth/signup");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    }

    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (
    token &&
    (token.profile as { firstName: string })?.firstName &&
    token &&
    (token.profile as { lastName: string })?.lastName
  ) {
    return NextResponse.redirect(new URL("/sessions", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)"],
};

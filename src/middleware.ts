import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log(token);

  const isAuth = !!token;
  const fromUrl = req.nextUrl.pathname;
  const isAuthPage =
    fromUrl.startsWith("/auth/login") || fromUrl.startsWith("/auth/signup");

  if (isAuthPage) {
    if (
      (isAuth! &&
        (token as { profile: { firstName: string } }).profile.firstName) ||
      !(token as { profile: { lastName: string } }).profile.lastName
    ) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    }

    if (
      (token as { profile: { firstName: string } }).profile.firstName &&
      (token as { profile: { lastName: string } }).profile.lastName &&
      (token as { profile: { member: boolean } }).profile.member !== null
    ) {
      return NextResponse.redirect(new URL("/sessions", req.url));
    } else if (
      (token as { profile: { member: boolean } }).profile.member === null
    ) {
      return NextResponse.redirect(new URL("/onboard/membership", req.url));
    }

    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  //if last name or first name null redirect to name page
  //   if (
  //     !(token as { profile: { firstName: string } }).profile.firstName ||
  //     !(token as { profile: { lastName: string } }).profile.lastName
  //   ) {
  //     return NextResponse.redirect(new URL("/onboard/name", req.url));
  //   }

  // if (
  //   (token as { profile: { firstName: string } }).profile.firstName &&
  //   (token as { profile: { lastName: string } }).profile.lastName &&
  //   (token as { profile: { member: boolean } }).profile.member !== null
  // ) {
  //   return NextResponse.redirect(new URL("/sessions", req.url));
  // } else if ((token as { profile: { member: boolean } }).profile.member === null) {
  //   return NextResponse.redirect(new URL("/onboard/membership", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)"],
};

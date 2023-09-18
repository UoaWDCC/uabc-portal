export { default } from "next-auth/middleware"

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api/auth|_next/static|_next/image|favicon.ico|auth).{1,})',
    ],
  }



import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname

    // Manage route protection
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

    const sensitiveRoutes = ["/admin"]

    if (isAuthPage && isAuth)
      return NextResponse.redirect(new URL("/", req.url))

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/auth", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/", "/auth", "/admin/:path*", "/api/:path*"],
}

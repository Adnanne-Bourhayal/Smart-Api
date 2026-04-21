import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  const session = req.cookies.get("sam_session")?.value

  if (session === "authenticated") {
    return NextResponse.next()
  }

  const loginUrl = new URL("/login", req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

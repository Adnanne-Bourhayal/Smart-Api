import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const expectedPassword = process.env.DASHBOARD_PASSWORD

    if (!expectedPassword) {
      return NextResponse.json({ ok: false, error: "Dashboard password is not configured" }, { status: 500 })
    }

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set("sam_session", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }
}

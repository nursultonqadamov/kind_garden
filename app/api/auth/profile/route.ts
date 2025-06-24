import type { NextRequest } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000"

/**
 * Proxy GET /api/auth/profile/ →  <BACKEND_URL>/api/auth/profile/
 */
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") ?? ""

  const upstream = await fetch(`${BACKEND_URL}/api/auth/profile/`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })

  const text = await upstream.text()

  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  })
}

import type { NextRequest } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000"

/**
 * Proxy POST /api/auth/login/ →  <BACKEND_URL>/api/auth/login/
 */
export async function POST(req: NextRequest) {
  const body = await req.json()

  const upstream = await fetch(`${BACKEND_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const text = await upstream.text()

  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  })
}

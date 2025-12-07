import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-webhook-secret",
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api/webhook")) {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
    }

    const res = NextResponse.next();
    // attach CORS headers for non-OPTIONS requests as well
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.headers.set(k, String(v)));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/webhook/:path*",
};

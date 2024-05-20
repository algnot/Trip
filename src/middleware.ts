import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  const { isLogged } = await responseAPI.json()

  if (!isLogged) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/notification", "/user", "/trip/create/:path*"],
};
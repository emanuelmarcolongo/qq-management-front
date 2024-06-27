import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "./utils/cookies/auth";

export async function middleware(request: NextRequest) {
  const acessToken = cookies().get("access_token");
  const userInfo = await getUserInfo();

  if (!acessToken || !userInfo) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (userInfo && !userInfo.is_admin) {
      return NextResponse.redirect(new URL("/app/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};

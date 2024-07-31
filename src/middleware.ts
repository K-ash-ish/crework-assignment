import { NextRequest, NextResponse } from "next/server";
import { verify } from "./lib/jwt";
// import jwt from "jsonwebtoken";

async function isAuthenticated(req: NextRequest) {
  const accessToken = req?.cookies?.get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }
  if (!process.env.ACCESS_TOKEN_SECRET) return;
  const isVerified = await verify(accessToken);
  if (!isVerified) {
    return false;
  }
  return true;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isAuth = await isAuthenticated(request);
  console.log(isAuth);
  // if (request.nextUrl.pathname === "/") {
  //   console.log("redirecting");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  if (request.nextUrl.pathname === "/login" && isAuth) {
    console.log("whatddodo");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (request.nextUrl.pathname === "/login" && !isAuth) {
    return response;
  }
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
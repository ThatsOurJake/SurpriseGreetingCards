import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/hub", "/api/create"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isLoggedIn = session?.user != null;
  const suffix = isLoggedIn ? "User logged in" : "User not logged in";
  console.log(`${request.url} | ${suffix}`);

  const shouldProtect = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (shouldProtect && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/api/auth/login?returnTo=${request.nextUrl.pathname}`, request.url));
  }

  const res = NextResponse.next();
  res.headers.set("x-url", request.url);
  return res;
};

export const config = {};


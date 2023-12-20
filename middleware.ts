import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession();
  const suffix = session?.user != null ? "User logged in" : "User not logged in";
  console.log(`${request.url} | ${suffix}`);
  res.headers.set("x-url", request.url);
  return res;
};

export const config = {};


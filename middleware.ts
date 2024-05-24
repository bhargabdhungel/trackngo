"use server";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // Redirect to landing page if not authenticated
  if (!token) return NextResponse.rewrite(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/bus/:path*"],
};

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import isPaidUser from "./app/actions/user/isPaid";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // Redirect to landing page if not authenticated
  console.log(token);
  if (!token) return NextResponse.redirect(new URL("/", req.url));

  // Check if user is paid without using prisma
  // yet to be done
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/bus/:path*"],
};

import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";
import { getToken } from "next-auth/jwt";

const auth_cookie = process.env.AUTH_COOKIE_KEY!;

const redirectToLanding = (req: NextRequest) => {
  return NextResponse.redirect(new URL("/", req.url));
};

const redirectToDashboard = (req: NextRequest) => {
  return NextResponse.redirect(new URL("/dashboard", req.url));
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.APP_JWT_SECRET });

  const sessionCookie = token?.accessToken;

  const secretJWT = process.env.APP_JWT_SECRET;
  const currentUrl = req.nextUrl.pathname;

  if (currentUrl.includes("/api/auth")) return;

  if (!sessionCookie && !secretJWT) return redirectToLanding(req);

  try {
    const {
      payload: { exp: expirationTime },
    } = await jwtVerify(sessionCookie!, new TextEncoder().encode(secretJWT));

    if (expirationTime! * 1000 < Date.now()) Cookies.remove(auth_cookie);
    else if (currentUrl === "/") return redirectToDashboard(req);
  } catch (error) {
    if (currentUrl !== "/") return redirectToLanding(req);
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/dashboard"],
};

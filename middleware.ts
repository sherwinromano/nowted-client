import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/auth";

const protectedRoutes = [
  "/new-note",
  "/personal",
  "/work",
  "/favorites",
  "/archived",
  "/trash",
];

const publicAuthRoutes = ["/sign-in"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = publicAuthRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

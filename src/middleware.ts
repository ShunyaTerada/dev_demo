import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isPrivateRoute = !publicRoutes.includes(request.nextUrl.pathname);
  
  // This is NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // API や画像など除外するべきファイルにマッチさせる
  matcher: [
    /*
     * /api で始まるパス以外
     * /_next/static, _next/image, favicon.ico などを除外
     * 画像ファイル(.png, .jpg, .jpeg, .gif, .svg, .webp など)を除外
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|webp|ico)).*)‍",
  ],
};
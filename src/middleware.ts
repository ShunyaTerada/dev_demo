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

/**
 * ミドルウェア設定オブジェクト - URLパターンマッチングを定義
 * 
 * @description パターンマッチングを使用してミドルウェアが実行されるルートを指定します。
 * 現在のマッチャーは、APIルート、静的ファイル、拡張子付きファイル、Next.js内部ルートを除外します。
 * 
 * @property {string[]} matcher - ミドルウェアが実行されるパスパターンの配列
 *   - 'api', 'static', '_next'で始まるパスを除外
 *   - ファイル拡張子を含むパス (.*\\..*) を除外
 *   - その他すべてのパスを否定先読み正規表現でマッチング
 */
export const config = {
    matcher: [
        "/((?!api|static|.*\\..*|_next).*)",
    ],
};

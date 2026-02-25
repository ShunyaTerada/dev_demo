"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-24 lg:px-36 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                M
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">My App</span>
          </Link>
        </div>

        {/* ナビゲーション */}
        <nav className="flex items-center space-x-4">
          {/* ペット一覧 - 常時表示 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/pets")}
          >
            ペット一覧
          </Button>

          {isPending ? (
            // ローディング状態
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          ) : !session ? (
            // 未ログイン時：ログインボタンを表示
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 border-gray-300"
              onClick={() => router.push("/login")}
            >
              ログイン
            </Button>
          ) : (
            // ログイン時：マイページとログアウトボタンを表示
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white"
                onClick={() => router.push("/mypage")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>マイページ</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                ログアウト
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

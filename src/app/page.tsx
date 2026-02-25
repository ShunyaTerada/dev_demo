import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero-pets.jpg"
          alt="かわいいペットたち"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            🐾 ペットパートナー
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white/90 drop-shadow">
            あなたの大切なペットの情報を簡単に管理できるアプリケーション
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-full bg-white text-gray-900 font-semibold px-8 py-3 text-base hover:bg-gray-100 transition-colors shadow-lg"
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className="rounded-full border-2 border-white text-white font-semibold px-8 py-3 text-base hover:bg-white/20 transition-colors shadow-lg"
            >
              新規登録
            </Link>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            主な機能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                安全な認証
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                メールアドレスで簡単にアカウント作成。安全な認証システムでデータを保護します。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                ペット管理
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ペットの情報を登録・編集・管理。一覧で簡単に確認できます。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                マイページ
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                アバター付きのマイページで、あなたとペットの情報をまとめて確認。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技術スタックセクション */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            技術スタック
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js 15",
              "TypeScript",
              "Tailwind CSS",
              "Better Auth",
              "Drizzle ORM",
              "Supabase",
              "Vercel",
              "Playwright",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
          <p className="text-lg mb-8 text-blue-100">
            アカウントを作成して、ペットの管理を始めてみませんか？
          </p>
          <Link
            href="/register"
            className="inline-block rounded-full bg-white text-blue-600 font-semibold px-8 py-3 text-base hover:bg-blue-50 transition-colors shadow-lg"
          >
            無料で登録する
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

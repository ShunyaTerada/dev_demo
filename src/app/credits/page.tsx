import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreditsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">クレジット</h1>
      <p className="text-gray-600">
        このアプリケーションの開発にご協力いただいたサービスとライブラリです。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DiceBear */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              DiceBear Avatars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              ユーザーアバター画像の生成に使用しています。
            </p>
            <div className="space-y-2">
              <div>
                <strong>ライセンス:</strong> CC0 (Public Domain)
              </div>
              <div>
                <strong>用途:</strong> ユーザープロフィール画像
              </div>
              <div>
                <strong>URL:</strong>{" "}
                <a
                  href="https://www.dicebear.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.dicebear.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next.js */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C19.146 4.25 16.06 2.18 12.134.346a19.766 19.766 0 0 0-.364-.033C11.731.001 11.597 0 11.572 0z" />
              </svg>
              Next.js
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Reactベースのフルスタックフレームワーク
            </p>
            <div className="space-y-2">
              <div>
                <strong>ライセンス:</strong> MIT License
              </div>
              <div>
                <strong>用途:</strong> アプリケーションフレームワーク
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tailwind CSS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
              </svg>
              Tailwind CSS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              ユーティリティファーストのCSSフレームワーク
            </p>
            <div className="space-y-2">
              <div>
                <strong>ライセンス:</strong> MIT License
              </div>
              <div>
                <strong>用途:</strong> UIスタイリング
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drizzle ORM */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Drizzle ORM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">TypeScript用のORMライブラリ</p>
            <div className="space-y-2">
              <div>
                <strong>ライセンス:</strong> Apache 2.0 License
              </div>
              <div>
                <strong>用途:</strong> データベース操作
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 感謝のメッセージ */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">感謝</h2>
          <p className="text-blue-800">
            オープンソースコミュニティの皆様の素晴らしい働きにより、
            このようなアプリケーションを作成することができました。
            心より感謝申し上げます。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCard } from '@/components/user-card';
import { verifySession } from '@/lib/session';

export default async function MypagePage() {

  const session = await verifySession();

  // プレビューモードかどうかの判定
  const isPreviewMode = session.user.id === 'preview-user-123';

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* プレビューモード表示バナー */}
      {isPreviewMode && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md">
          <p className="font-medium">🎭 プレビューモード</p>
          <p className="text-sm">認証をバイパスしてマイページをプレビュー中です。本番では無効化されます。</p>
        </div>
      )}

      <h1 className="text-3xl font-bold">マイページ</h1>

      <Card>
        <CardHeader>
          <CardTitle>ようこそ！</CardTitle>
          <CardDescription>
            マイページへのアクセスが成功しました。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>ここはユーザーの個人ページです。</p>
            <UserCard user={session.user} />
            <Button>設定を変更</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
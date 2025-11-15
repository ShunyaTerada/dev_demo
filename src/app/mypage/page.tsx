import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MypagePage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
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
            <Button>設定を変更</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
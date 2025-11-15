import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCard } from '@/components/user-card';
import { auth } from '../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MypagePage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

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
            <UserCard user={session.user} />
            <Button>設定を変更</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
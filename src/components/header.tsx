'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-24 lg:px-36 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">My App</span>
          </Link>
        </div>

        {/* ナビゲーション */}
        <nav className="flex items-center space-x-4">
          {/* ログインボタン */}
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-50 border-gray-300"
            onClick={() => {
              console.log('ログインボタンがクリックされました');
              router.push('/login');
            }}
          >
            ログイン
          </Button>
          
          {/* マイページへのリンク */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-2 bg-black hover:bg-gray-300 text-white"
            onClick={() => {
              console.log('マイページボタンがクリックされました - 遷移先: /mypage');
              router.push('/mypage');
            }}
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
        </nav>
      </div>
    </header>
  );
}
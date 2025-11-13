import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">My App</span>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center space-x-4">
            {/* マイページへのリンク */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
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
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
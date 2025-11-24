import 'server-only';

import { redirect } from 'next/navigation';
import { auth } from './auth';
import { headers } from 'next/headers';

export const verifySession = async () => {
    // 環境変数でプレビューモードを制御
    const isPreviewMode = process.env.AUTH_PREVIEW_MODE === 'true' && process.env.NODE_ENV === 'development';

    // プレビューモード時はダミーセッションを返す
    if (isPreviewMode) {
        console.log('🎭 プレビューモードでマイページにアクセス中');
        return {
            user: {
                id: 'preview-user-123',
                name: 'プレビューユーザー',
                email: 'preview@example.com',
                image: null,
                emailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            session: {
                id: 'preview-session-123',
                userId: 'preview-user-123',
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24時間後
                token: 'preview-token',
                createdAt: new Date(),
                updatedAt: new Date(),
                ipAddress: '127.0.0.1',
                userAgent: 'Preview Mode'
            }
        };
    }

    // 通常の認証フロー
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/login');
    }

    return session;
}
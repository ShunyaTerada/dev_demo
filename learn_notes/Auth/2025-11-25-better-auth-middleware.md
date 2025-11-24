# Better Authによるログイン実装とMiddlewareによるルート保護

**学習日**: 2025-11-25
**参照ドキュメント**:
- [Better Auth: Email & Password](https://www.better-auth.com/docs/authentication/email-password)
- [Next.js: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## 1. 概念と前提知識（The Big Picture）

### 認証 (Authentication) と 認可 (Authorization)
Webアプリケーションのセキュリティには、大きく分けて2つの関門があります。

1.  **認証 (Authentication)**: 「あなたは誰ですか？」を確認するプロセス。
    *   **役割**: ユーザーが本人であることを証明する（ログイン）。
    *   **比喩**: 空港のチェックインカウンター。パスポートを見せて、搭乗券（セッション/トークン）を発行してもらう手続き。
2.  **認可 (Authorization)**: 「あなたはここに入っていいですか？」を確認するプロセス。
    *   **役割**: 特定のリソース（マイページなど）へのアクセス権限があるかチェックする。
    *   **比喩**: 保安検査場や搭乗ゲート。搭乗券（セッション）を持っていないと、制限エリア（マイページ）に入れない。

今回実装したのは、**「Better Authを使った認証（チェックイン）」**と**「Middlewareを使った認可（保安検査）」**です。

## 2. ライブラリのアプローチとロジック

### Better Authのアプローチ
Better Authは、複雑になりがちな認証フローを「クライアントSDK」と「サーバーサイドプラグイン」で簡略化しています。

*   **Input**: ユーザーがメールアドレスとパスワードを入力。
*   **Process**:
    1.  `authClient.signIn.email` がサーバーのエンドポイントを叩く。
    2.  サーバーがDBと照合し、正しければセッションを作成。
    3.  **重要**: サーバーはブラウザに対し、`HttpOnly Cookie` としてセッション情報を保存するよう命令する。
*   **Output**: ログイン成功。以降のリクエストには自動的にこのCookieが付与される。

### Middlewareのアプローチ
Next.jsのMiddlewareは、リクエストがページに到達する**手前**で実行されるプログラムです。

*   **Input**: ユーザーからのページアクセスリクエスト（Cookieを含む）。
*   **Process**:
    1.  リクエスト内のCookieを確認し、有効なセッションがあるかチェックする（`getSessionCookie`）。
    2.  アクセスしようとしているページが「公開（Public）」か「非公開（Private）」か判断する。
    3.  「非公開ページ」かつ「セッションなし」なら、強制的にログインページへ飛ばす。
*   **Output**: ページの表示許可（`NextResponse.next()`）またはリダイレクト（`NextResponse.redirect()`）。

## 3. 実際のコードと文脈（Code Context）

### A. ログインフォーム (`login-form.tsx`)

```typescript
// フレームワーク: 非同期処理で認証を行い、結果に応じて分岐する
await authClient.signIn.email({
  email,
  password,
}, {
  onSuccess: () => {
    // 成功時: マイページへ移動
    router.push('/mypage');
  },
  onError: (ctx) => {
    // 失敗時: エラーメッセージを表示
    setError(ctx.error.message);
  }
});
```

*   **`authClient`**: Better Authが生成するクライアント用オブジェクト。型安全にAPIを叩けます。
*   **`onSuccess`**: サーバー側でCookieのセットが完了した後に呼ばれます。ここで画面遷移することで、次のページでは確実に「ログイン済み」として扱われます。

### B. ミドルウェア (`middleware.ts`)

```typescript
// フレームワーク: リクエストごとに実行され、アクセス可否を判断する
export async function middleware(request: NextRequest) {
  // 1. セッションCookieの有無を確認（検証まではしない軽量チェック）
  const sessionCookie = getSessionCookie(request);
  
  // 2. 現在のパスが「公開ルート」に含まれていないか確認
  const isPrivateRoute = !publicRoutes.includes(request.nextUrl.pathname);

  // 3. 「非公開」かつ「セッションなし」ならログイン画面へ
  if (!sessionCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. それ以外は通す
  return NextResponse.next();
}
```

*   **`getSessionCookie`**: Better Authが提供するヘルパー関数。DBへの問い合わせは行わず、Cookieの存在確認だけを行うため高速です。Middlewareは全リクエストで走るため、軽さが重要です。
*   **`publicRoutes`**: ログインなしで見られるページのリスト。ここに漏れがあると、未ログインでも見れてしまう（セキュリティホール）か、ログイン画面にリダイレクトされ続ける（無限ループ）原因になります。

## 4. もしこの技術を使わなかったら？（The Hard Way）

もしBetter AuthやMiddlewareを使わずに実装する場合：

1.  **認証APIの自作**: パスワードのハッシュ化（bcryptなど）、DB照合、JWTの生成と署名をすべて自分で書く必要があります。
2.  **Cookie管理**: `Set-Cookie` ヘッダーを手動で構築し、`HttpOnly`, `Secure`, `SameSite` 属性を適切に設定しないと、XSSやCSRFといった攻撃の標的になります。
3.  **各ページでのチェック**: Middlewareがない場合、**すべての非公開ページコンポーネント**の冒頭で「ログインしているか？」を確認するコードを書く必要があります（`useEffect` や `getServerSideProps` で）。書き忘れたページは誰でも見れてしまいます。

## 5. 技術選定とプロ視点の分析

*   **Better Authの強み**:
    *   **安全性**: セッション管理のベストプラクティス（HttpOnly Cookieなど）がデフォルトで適用されている。
    *   **生産性**: クライアントSDKが強力で、`fetch` を手書きする必要がない。
*   **Middlewareの注意点**:
    *   **Edge Runtime**: Middlewareは「Edge Runtime」という制約のある環境で動くため、Node.jsの全機能（特定の重いライブラリなど）は使えません。
    *   **パフォーマンス**: ここで重い処理（毎回DBに問い合わせるなど）をすると、サイト全体の表示が遅くなります。Better Authの `getSessionCookie` はCookieの有無を見るだけなので、この理にかなっています。

## 6. さらなる理解のための推奨リソース

*   [Next.js Documentation: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) - Middlewareの仕組みと制約について。
*   [MDN Web Docs: HTTP Cookies](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies) - 認証の裏側にあるCookieの仕組みについて。

# [Better Auth] クライアントサイドでのセッション管理と条件付きレンダリング

**学習日**: 2025-11-25
**参照ドキュメント**: [Better Auth - Session Management](https://www.better-auth.com/docs/concepts/session-management)

## 1. 🧠 概念と前提知識（The Big Picture）

- **定義と分類**: Webアプリにおいて、ユーザーが「誰であるか」という状態（セッション）をブラウザ側（クライアントサイド）で把握し、それに基づいて画面表示を変える技術です。
- **関連概念**:
    - **サーバーサイドレンダリング (SSR)**: サーバー側でHTMLを作る時点でセッションを確認する方法（`src/lib/session.ts` でやっていること）。
    - **クライアントサイドレンダリング (CSR)**: ブラウザでJavaScriptが動いてからセッションを確認する方法（今回やったこと）。
- **実用的な文脈**: ヘッダーのように、全ページ共通で常に表示され、かつユーザーの状態によって中身が変わるコンポーネントで頻繁に使用されます。

## 2. 🛠 ライブラリのアプローチとロジック

Better Authの `authClient.useSession()` は、Reactのフックとして提供されています。

1.  **初期化**: コンポーネントがマウントされると、自動的にバックグラウンドでAPI（`/api/auth/get-session`）を叩きに行きます。
2.  **状態管理**:
    - `data`: セッション情報（ユーザーIDやメールアドレスなど）。未ログインなら `null`。
    - `isPending`: サーバーに問い合わせ中かどうか（`true`/`false`）。
    - `error`: エラー情報。
3.  **リアクティブ**: ログインやログアウトのアクションが発生すると、自動的に状態を更新し、画面を再描画します。

## 3. 📝 実際のコードと文脈（Code Context）

```tsx
// 1. フックの呼び出し
const { 
  data: session, // セッションデータ（ログインしていればオブジェクト、なければnull）
  isPending      // 通信中かどうか（true/false）
} = authClient.useSession();

// 2. JSXでの条件付きレンダリング
return (
  <nav>
    {/* A. 通信中: スケルトンを表示して場所を確保 */}
    {isPending ? (
      <div className="animate-pulse bg-gray-200..." />
    ) : !session ? (
      // B. 未ログイン: ログインボタン
      <Button onClick={login}>ログイン</Button>
    ) : (
      // C. ログイン済み: マイページ・ログアウト
      <>
        <Button>マイページ</Button>
        <Button onClick={logout}>ログアウト</Button>
      </>
    )}
  </nav>
);
```

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）

もし `useSession` を使わずに自前で実装する場合、以下のようなコードを書く必要があります（**Vanilla React**のアプローチ）。

```tsx
// ❌ 大変な実装例
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  // マウント時にAPIを叩く
  fetch('/api/auth/session')
    .then(res => res.json())
    .then(data => {
      setSession(data);
      setLoading(false);
    });
}, []);

// さらに、ログアウト時にこのstateを更新する仕組みを
// グローバルなContextなどで管理しないと、ヘッダーの表示が切り替わりません。
```

Better Authを使うことで、これらの「通信」「状態管理」「更新の同期」を1行で済ませることができます。

## 5. ⚖️ 技術選定とプロ視点の分析

- **メリット**: `useSession` は **SWR** や **TanStack Query** のような「Stale-while-revalidate」戦略に近い挙動をするため、タブを切り替えて戻ってきた時に再検証したり、ネットワーク復帰時に再取得したりと、堅牢な作りになっています。
- **注意点**: クライアントサイドでの取得なので、一瞬「読み込み中」の状態が発生します。SEOが重要なコンテンツや、チラつきを絶対に見せたくない場合は、サーバーコンポーネントでセッションを取得し、Propsとして渡す手法（SSR）を検討します。ただし、ヘッダーのような動的なUIパーツでは `useSession` が最適解です。

## 6. 📖 さらなる理解のための推奨リソース

- [Better Auth - Client Hooks](https://www.better-auth.com/docs/concepts/client-hooks): 他のフックについての解説。
- [React - Conditional Rendering](https://ja.react.dev/learn/conditional-rendering): Reactにおける条件付きレンダリングの基礎。

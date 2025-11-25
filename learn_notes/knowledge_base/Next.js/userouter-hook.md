# useRouter Hook

**学習日**: 2025-11-26
**参照ドキュメント**: [Next.js App Router API Reference: useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)

## 1. 概念と前提知識（The Big Picture）
**「ユーザーをプログラムの力で別のページへ連れて行く機能」**です。

- **定義**: `useRouter` は、ユーザーがリンクをクリックするのではなく、**プログラムの処理の結果として**（例：フォーム送信が成功した後など）ページ遷移を行いたい場合に使用するフック（Hook）です。
- **現実世界の比喩**:
    - `<Link>` コンポーネントは「案内看板」です。ユーザーがそれを見て自分で歩いていきます。
    - `useRouter` は「タクシー」です。ユーザーが何もしなくても、運転手（プログラム）が目的地まで自動的に連れて行ってくれます。
- **CSの基礎**: Webブラウザには「履歴（History API）」という機能があり、`useRouter` はこれを操作して、ページ全体を再読み込みすることなくURLだけを書き換えて画面を切り替えます（SPA: Single Page Application の挙動）。

## 2. ライブラリのアプローチとロジック
Next.js の App Router (`app` ディレクトリ) では、`useRouter` は **Client Component** (`'use client'`) 専用の機能として提供されています。

- **ロジック**:
    1.  **Import**: `next/navigation` からフックを読み込む。
    2.  **Hook**: コンポーネント内で `useRouter()` を呼び出し、ルーターオブジェクトを取得する。
    3.  **Action**: `router.push('/path')` などを実行すると、Next.js は必要なデータだけをサーバーから取得し、画面をスムーズに書き換えます。

## 3. 実際のコードと文脈（Code Context）

### ステップ1: 正しいインポート（最重要）
```typescript
// ❌ 間違い（古い Pages Router 用）
// import { useRouter } from 'next/router';

// ✅ 正解（App Router 用）
import { useRouter } from 'next/navigation';
```
> **注意**: VS Codeの自動補完で間違って `next/router` を選んでしまうことが多いので、必ず `next/navigation` であることを確認してください。

### ステップ2: フックの呼び出し
コンポーネントの内部で、変数を定義します。
```typescript
'use client'; // 必須

export default function RegisterForm() {
  // ルーターのインスタンス（操作盤）を取得
  const router = useRouter(); 
  // ...
```

### ステップ3: メソッドの実行
任意のタイミング（ボタンクリックやフォーム送信完了時）でメソッドを呼び出します。
```typescript
const onSubmit = async (data: RegisterFormData) => {
    // ... 登録処理 ...
    
    // 登録成功後、ログインページに移動させる
    router.push('/login'); 
};
```

### その他のよく使うメソッド
- `router.push('/path')`: 新しいページに移動（ブラウザの「戻る」ボタンで戻れる）。
- `router.replace('/path')`: 現在のページを上書きして移動（「戻る」ボタンで戻れないようにする。ログイン後のリダイレクトなどでよく使う）。
- `router.back()`: 一つ前のページに戻る。
- `router.refresh()`: 現在のページのデータをサーバーから再取得して更新する。

## 4. もしこの技術を使わなかったら？（The Hard Way）
もし `useRouter` を使わずに、標準の JavaScript だけで実装するとどうなるでしょうか？

```typescript
// 👎 Vanilla JS の場合
window.location.href = '/login';
```

- **問題点**: これを実行すると、ブラウザは**ページ全体を白紙にしてから、サーバーに新しいHTMLを要求し、CSSやJavaScriptをすべてダウンロードし直します（フルリロード）**。
- **結果**: 画面が一瞬白くなり、動作が遅く感じられ、アプリのような「サクサク感」が失われます。`useRouter` はこれを防ぎ、必要な部分だけを更新してくれます。

## 5. 技術選定とプロ視点の分析
- **`<Link>` vs `useRouter`**:
    - **`<Link href="...">`**: 基本的にはこちらを使います。SEOに強く、ユーザーが右クリックで「新しいタブで開く」ことができるため、UXが良いです。
    - **`useRouter`**: 「フォーム送信完了後」や「ログイン成功後」など、**ユーザーの操作ではなく、処理の結果として遷移させたい場合**にのみ使います。
- **アンチパターン**:
    - 単なるページ移動ボタンに `onClick={() => router.push('/path')}` を使うのは避けましょう。それは `<Link>` の役割です。

## 6. さらなる理解のための推奨リソース
- **Next.js 公式**: [Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook)
    - `useRouter` だけでなく、ナビゲーション全体のベストプラクティスが書かれています。

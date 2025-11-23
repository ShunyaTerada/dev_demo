# [ジェネリクス (Generics)]

**学習日**: 2025-11-24
**参照ドキュメント**: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## 1. 🧠 概念と前提知識（The Big Picture）
### 定義と分類
**ジェネリクス (Generics)** は、型を「パラメータ」として受け取ることで、様々な型に対応できる「柔軟な金型」を作る機能です。
「たい焼きの型」のようなもので、中身（型）を変えるだけで、あんこ入り（String用）やクリーム入り（Number用）など、形は同じでも中身が違うものを作れます。

### 実用的な文脈
APIのレスポンス型、ReactコンポーネントのProps、ユーティリティ関数など、再利用性が高いコードで必須となります。

## 2. 🛠 ライブラリのアプローチとロジック
### `PageProps<T>` の仕組み
*   `PageProps` はジェネリック型として定義されています（例: `type PageProps<T> = ...`）。
*   `<'/pets/[id]'>` という文字列（ルート定義）を渡すことで、そのルートに必要な `params` の型（この場合は `{ id: string }`）を自動的に計算して生成します。

## 3. 📝 実際のコードと文脈（Code Context）

```typescript
// ジェネリクス: '/pets/[id]' というパス情報を型に伝える
export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    // TypeScriptはここで params が { id: string } を持っていることを知っている
    const petId = (await params).id;
}
```

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）

```typescript
// ページごとに手動で型定義が必要
type PetPageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PetPage({ params }: PetPageProps) { ... }
```
ページが増えるたびに似たような型定義を書く必要があり、修正漏れやミスが発生しやすくなります。

## 5. ⚖️ 技術選定とプロ視点の分析
*   **型安全性**: URLの構造とコード内の型を同期させることができます。
*   **保守性**: ルーティングの仕様が変わった場合、ジェネリクスの定義元を修正するだけで全ページに反映されます。

## 6. 📖 さらなる理解のための推奨リソース
*   [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

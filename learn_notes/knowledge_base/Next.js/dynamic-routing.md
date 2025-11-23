# ダイナミックルーティング（動的ルーティング）

**学習日**: 2025-11-24
**参照ドキュメント**: [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## 1. 🧠 概念と前提知識（The Big Picture）
**「ダイナミックルーティング」とは、URLの一部を「変数」として扱い、一つのページファイルで複数の異なるコンテンツを表示する仕組み**です。

- **比喩**: 役所の「窓口」を想像してください。
    - **静的ルーティング**: 「住民票係」「納税係」のように、特定の業務専用の窓口が決まっている状態（`/about`, `/contact`）。
    - **動的ルーティング**: 「総合相談窓口」のように、来る人（ID）によって対応内容を変える窓口（`/pets/1`, `/pets/2`）。窓口（ファイル）は一つですが、渡される整理券番号（ID）によって処理が変わります。

- **実用的な文脈**: ブログ記事（`/posts/how-to-code`）、商品ページ（`/products/12345`）、ユーザープロフィール（`/users/shun`）など、**「型は同じだが中身のデータだけ違うページ」**を量産する際に必須の機能です。

## 2. 🛠 ライブラリのアプローチとロジック
Next.js（App Router）では、**ファイルシステムベースのルーティング**を採用しており、フォルダ名に角括弧 `[]` を使うことで動的ルートを定義します。

- **Input (URL)**: ユーザーが `/pets/123` にアクセス。
- **Process (Next.js)**:
    1. `app/pets/[id]/page.tsx` というファイルを探し当てます。
    2. URLの `123` という部分を切り出し、`params` というオブジェクト（`{ id: '123' }`）に変換します。
    3. これをページコンポーネントに渡します。
- **Output (Page)**: ページコンポーネントは受け取った `id` を使ってデータベースからペット情報を取得し、HTMLを生成します。

## 3. 📝 実際のコードと文脈（Code Context）
`src/app/pets/[id]/page.tsx` を作成する場合のコードです。
※ Next.js 15以降、`params` は **Promise（非同期）** になった点に注意が必要です。

```tsx
// src/app/pets/[id]/page.tsx

// 1. paramsの型定義
// Promise<{ id: string }> であることに注意
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PetDetailPage({ params }: Props) {
  // 2. paramsをawaitして中身を取り出す（Next.js 15+の仕様）
  const { id } = await params;

  // 3. IDを使ってデータを取得（DBアクセスなど）
  // ここで "123" というIDを使って "ポチ" の情報を引く
  // const pet = await getPetById(id); 

  return (
    <div>
      <h1>ペットID: {id} の詳細ページ</h1>
      {/* <p>名前: {pet.name}</p> */}
    </div>
  );
}
```

- **`[id]`**: フォルダ名。これが変数名になります。`[slug]`なら `params.slug` になります。
- **`await params`**: Next.js 15からの変更点。以前は同期的にアクセスできましたが、将来的な最適化のために非同期になりました。

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）
もしダイナミックルーティングがなかったら、以下のどちらかをする必要があります。

1.  **全ページ手動作成**:
    - `app/pets/pochi.tsx`
    - `app/pets/tama.tsx`
    - ...ペットが増えるたびにエンジニアがファイルを作成しデプロイし直す必要があります。現実的ではありません。

2.  **クエリパラメータ地獄**:
    - 全て `/pets` ページで処理し、`/pets?id=123` のようにクエリパラメータを使う。
    - **デメリット**: URLが `?id=...` だらけになり、SEO（検索エンジン最適化）的に不利になります。また、階層構造（`/category/shoes/nike`）を表現しにくくなります。

## 5. ⚖️ 技術選定とプロ視点の分析
- **メリット**:
    - **SEO**: `/pets/123` のようなクリーンなURLは検索エンジンに好まれます。
    - **保守性**: 1つのファイルで無限のページに対応できます。
- **注意点 (Next.js特有)**:
    - **SSG (Static Site Generation)**: ビルド時にページを生成したい場合、`generateStaticParams` という関数を使って「あらかじめどんなIDが存在するか」をNext.jsに教えてあげる必要があります（今回はSSR想定なので割愛）。

## 6. 📖 さらなる理解のための推奨リソース
- [Next.js Docs: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Docs: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) (静的生成する場合)

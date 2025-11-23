# [分割代入とインポート (Destructuring & Imports)]

**学習日**: 2025-11-24
**参照ドキュメント**: [Object Destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#object-destructuring)

## 1. 🧠 概念と前提知識（The Big Picture）
### 定義と分類
**分割代入 (Destructuring Assignment)** は、オブジェクトや配列から特定のデータを「つまみ食い」して、変数として取り出すための構文です。
「宅配便のダンボール（オブジェクト）から、中身（プロパティ）を直接取り出して手元に置く」イメージです。

### 関連概念
*   **Named Export (名前付きエクスポート)**: `{}` を使ってインポートする必要があるもの。
*   **Default Export (デフォルトエクスポート)**: `{}` なしでインポートできるもの。

### 実用的な文脈
React/Next.jsでは、コンポーネントの `props` から必要なデータだけを取り出す際や、ライブラリから特定の関数だけをインポートする際に頻繁に使用されます。

## 2. 🛠 ライブラリのアプローチとロジック
### インポート時の `{}`
*   `import { getPet } ...`: `getPet` という**特定の名前**でエクスポートされたものを取り出します。
*   `import PetPage ...`: そのモジュールが「メイン」としてエクスポートしているもの（Default Export）を取り出します。名前は自由に決められます。

### 引数での `{}`
*   `function PetPage({ params })`: `props` オブジェクト全体を受け取るのではなく、その中の `params` プロパティだけを取り出して変数化しています。

## 3. 📝 実際のコードと文脈（Code Context）

```typescript
// 名前付きインポート: モジュールから 'getPet' だけを取り出す
import { getPet } from "@/data/pet"; 

// 分割代入: propsオブジェクトの中から params だけを取り出す
export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    // ここで params は既に変数として使える
    const id = (await params).id;
}
```

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）

```typescript
import petModule from "@/data/pet"; // 全部インポート

export default async function PetPage(props: any) { // props全体を受け取る
    const params = props.params; // 手動で取り出す
    const pet = await petModule.getPet(params.id); // モジュール名.関数名でアクセス
}
```
コードが冗長になり、何を使っているかがひと目でわかりにくくなります。

## 5. ⚖️ 技術選定とプロ視点の分析
*   **可読性**: 必要なデータが関数のシグネチャ（1行目）でわかるため、コードが読みやすくなります。
*   **バンドルサイズ**: 名前付きインポートを使うと、ツリーシェイキング（不要なコードの削除）が効きやすくなる場合があります（ライブラリによる）。

## 6. 📖 さらなる理解のための推奨リソース
*   [MDN Web Docs: 分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

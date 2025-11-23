# [非同期パラメータ (Async Params)]

**学習日**: 2025-11-24
**参照ドキュメント**: [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change)

## 1. 🧠 概念と前提知識（The Big Picture）
### 定義と分類
Next.js 15以降、動的ルートの `params` や `searchParams` は、同期的なオブジェクトから **Promise（非同期オブジェクト）** に変更されました。
これは「まだ届いていないかもしれない荷物」であり、中身を見る前に「届くのを待つ（await）」必要があります。

### 実用的な文脈
将来的な機能（Partial Prerenderingなど）において、サーバーがリクエストを受け取ってからパラメータを解決するまでの時間を最適化するために導入されました。

## 2. 🛠 ライブラリのアプローチとロジック
### `(await params).id` の構文
*   `params` は `Promise<{ id: string }>` 型です。
*   `await params` でPromiseを解決し、実体のオブジェクト `{ id: string }` を取得します。
*   その結果に対して `.id` でアクセスします。
*   `()` が必要なのは、演算子の優先順位のためです（`.` は `await` より強く結びつくため）。

## 3. 📝 実際のコードと文脈（Code Context）

```typescript
export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    // 1. params を await して解決
    // 2. 解決したオブジェクトから id を取得
    const petId = (await params).id;
    
    // NG: await params.id (paramsにはまだidプロパティがないためエラー)
}
```

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）
以前のバージョン（Next.js 14まで）では同期的にアクセスできましたが、Next.js 15では非同期アクセスが強制されます。
これを無視すると、開発モードでは警告、ビルド時にはエラーが発生する可能性があります。

## 5. ⚖️ 技術選定とプロ視点の分析
*   **パフォーマンス**: 必要なタイミングまでパラメータの解決を遅延させることで、レンダリングの最適化が可能になります。
*   **将来性**: Reactの `use()` フックと組み合わせることで、非同期データの扱いが統一されていく流れに沿っています。

## 6. 📖 さらなる理解のための推奨リソース
*   [Next.js Docs: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

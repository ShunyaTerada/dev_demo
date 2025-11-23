# [オプショナルチェーン (Optional Chaining)]

**学習日**: 2025-11-24
**参照ドキュメント**: [Optional chaining (?.)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## 1. 🧠 概念と前提知識（The Big Picture）
### 定義と分類
**オプショナルチェーン (`?.`)** は、オブジェクトのプロパティにアクセスする際、そのオブジェクトが `null` や `undefined` であってもエラーを起こさず、安全に `undefined` を返すための演算子です。
「もし存在すればアクセスする、なければ何もしない」という安全装置です。

### 実用的な文脈
APIレスポンスやデータベース検索結果など、「データが存在しない可能性がある」場合に、アプリをクラッシュさせずに表示を続けるために必須です。

## 2. 🛠 ライブラリのアプローチとロジック
### `pet?.name` の挙動
1.  `pet` が `null` または `undefined` かどうかを確認します。
2.  もしそうなら、即座に評価を停止し、`undefined` を返します（ショートサーキット）。
3.  もしデータがあれば、`.name` にアクセスしてその値を返します。

## 3. 📝 実際のコードと文脈（Code Context）

```typescript
// pet は DB検索結果なので、見つからない場合は null になる可能性がある
const pet = await getPet(petId);

return (
    <div>
        {/* pet が null なら undefined になり、Reactは何も描画しない */}
        <p>名前: {pet?.name}</p>
    </div>
);
```

## 4. 🚫 もしこの技術を使わなかったら？（The Hard Way）

```typescript
// 従来の方法（AND演算子や三項演算子）
<p>名前: {pet && pet.name}</p>
// または
<p>名前: {pet ? pet.name : ''}</p>
```
ネストが深くなると `user && user.address && user.address.city` のように記述が非常に長くなり、可読性が低下します。

## 5. ⚖️ 技術選定とプロ視点の分析
*   **安全性**: `TypeError: Cannot read properties of null` というJavaScriptの代表的な実行時エラーを防げます。
*   **簡潔さ**: コードが短くなり、意図（「あれば表示」）が明確になります。

## 6. 📖 さらなる理解のための推奨リソース
*   [MDN Web Docs: オプショナルチェーン](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

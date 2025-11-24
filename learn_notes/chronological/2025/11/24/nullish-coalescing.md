# Null合体演算子 (Nullish Coalescing Operator)

**学習日**: 2025-11-24
**参照ドキュメント**: [Null 合体演算子 (??) - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

## 1. 概念と前提知識（The Big Picture）
- **定義**: `??` は、左辺が **`null` または `undefined` の場合のみ**、右辺の値を返し、それ以外の場合は左辺の値を返す論理演算子です。
- **役割**: 「値がない場合のデフォルト値（フォールバック）」を設定するために使われます。
- **現実世界の比喩**:
    - **`??` (Null合体)**: 「お弁当持ってきた？（持参の確認）」
        - お弁当を**忘れた**（null/undefined）場合 → コンビニで買う（右辺）。
        - お弁当が**空っぽ**でも、箱さえあれば（0や空文字） → それを食べる（左辺）。
    - **`||` (論理和)**: 「お腹いっぱいになるもの持ってる？」
        - お弁当が**空っぽ**（0や空文字）の場合 → コンビニで買う（右辺）。

## 2. ライブラリのアプローチとロジック
JavaScriptのエンジンは以下のように処理します：

```javascript
const result = 左辺 ?? 右辺;
```

1.  **左辺**を評価します。
2.  左辺が `null` か `undefined` ですか？
    - **YES**: **右辺**を返します。
    - **NO**: **左辺**をそのまま返します（たとえそれが `0` や `false` や `""` であっても）。

## 3. 実際のコードと文脈（Code Context）
実際のコードでの使われ方：

```typescript
defaultValues: defaultValues ?? {
  name: '',
  type: undefined,
  hp: 50,
},
```

- **`defaultValues` (左辺)**: 親コンポーネントから渡されたプロパティです。
    - 新規作成ページでは渡されないので `undefined` になります。
    - 編集ページではペットのデータ（オブジェクト）が入っています。
- **`??`**: 「左の `defaultValues` は存在しますか？」と聞きます。
- **`{ ... }` (右辺)**: 左が存在しない（新規作成）場合に使われる、初期値のオブジェクトです。

**動作の流れ:**
1.  **新規作成時**: `defaultValues` は `undefined` です。`??` は右側の `{ name: '', ... }` を採用します。これでフォームは空の状態で始まります。
2.  **編集時**: `defaultValues` に `{ name: 'ポチ', ... }` が入っています。`??` は左側のデータを採用します。これでフォームにポチの情報が入った状態で始まります。

## 4. もしこの技術を使わなかったら？（The Hard Way）
昔ながらの方法（三項演算子）で書くとこうなります。少し長くなります。

```typescript
// もし defaultValues が null でも undefined でもないならそれを使う、そうでなければ初期値を使う
defaultValues: (defaultValues !== null && defaultValues !== undefined)
  ? defaultValues
  : { name: '', type: undefined, hp: 50 },
```

## 5. 技術選定とプロ視点の分析
- **なぜ `||` (OR) ではないのか？**:
    - よく似た `||` 演算子 (`defaultValues || { ... }`) を使うと、バグの原因になることがあります。
    - 例えば、もし `hp` という単独の変数を扱っていて、HPが `0` の場合：
        - `const hp = 0 || 50;` → 結果は `50` になってしまいます（0はFalsyなため）。
        - `const hp = 0 ?? 50;` → 結果は `0` になります（0は値として有効なため）。
    - 今回のようなオブジェクト全体の場合は `||` でも動くことが多いですが、**「値がない（null/undefined）」と「値が空/ゼロ（false/0/""）」を区別する**ために、現代のJavaScript開発では `??` を使うのがベストプラクティスです。

## 6. さらなる理解のための推奨リソース
- [MDN: Null 合体演算子 (??)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [TypeScript Deep Dive: Nullish Coalescing](https://typescript-jp.gitbook.io/deep-dive/future-javascript/nullish-coalescing)

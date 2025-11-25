# useForm Usage (React Hook Form)

**学習日**: 2025-11-26
**参照ドキュメント**:
- [React Hook Form - useForm API](https://react-hook-form.com/docs/useform)
- [Zod - Basic Usage](https://zod.dev/?id=basic-usage)
- [shadcn/ui - Form](https://ui.shadcn.com/docs/components/form)

## 1. 概念と前提知識（The Big Picture）

`useForm` は、フォームにおける**「司令塔（Manager）」**です。

- **定義**: フォームの入力値、エラー状態、送信中の状態（isSubmitting）などを一元管理するカスタムフックです。
- **役割**:
    - 入力値の監視と保持
    - バリデーション（検証）の実行
    - 送信処理のハンドリング
- **比喩**: 役所の「受付窓口の管理者」です。申請書（フォーム）の内容に不備がないかチェックし、問題があれば赤ペンで修正箇所（エラー）を指摘し、すべてOKなら受理（送信）する役割を一手に引き受けています。

## 2. ライブラリのアプローチとロジック

React Hook Form は**「非制御コンポーネント（Uncontrolled Components）」**というアプローチを主軸にしています。

- **通常（Reactの標準）**: 入力があるたびに画面全体を再描画して値を管理します（制御コンポーネント）。これは丁寧ですが、入力項目が多いと動作が重くなります。
- **React Hook Form**: 必要なときだけ値をチェックし、無駄な再描画を極限まで減らします。
- **Zodとの連携**: `resolver` という仕組みを使い、「バリデーションのルールブック」として Zod のスキーマ（`RegisterSchema`）を渡すことで、ロジックとUIをきれいに分離しています。

## 3. 実際のコードと文脈（Code Context）

### Step 1: 司令塔の初期化（useForm）

```tsx
// ジェネリクス <RegisterFormData> で、フォームが扱うデータの型を定義しています
const form = useForm<RegisterFormData>({
  // resolver: バリデーションのルールブック（Zodスキーマ）をセット
  resolver: zodResolver(RegisterSchema),
  // defaultValues: フォームの初期値。これがないと「非制御」の入力欄が正しく動きません
  defaultValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
});
```

- `resolver: zodResolver(RegisterSchema)`: これにより、ユーザーが入力するたび（または送信時）に、自動的に定義したルール（必須、文字数など）でチェックが行われます。

### Step 2: UIコンポーネントへの接続

shadcn/ui の `<Form>` コンポーネントを使って、司令塔と入力欄を繋ぎます。

```tsx
// Formプロバイダーで、フォーム全体に司令塔（form）の情報を渡します
<Form {...form}>
  {/* handleSubmit: 送信ボタンが押されたら、まずバリデーションを行い、
      成功した場合のみ onSubmit 関数を実行するラッパー関数です */}
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    
    {/* FormField: 個別の入力欄を管理するコンポーネント */}
    <FormField
      control={form.control} // 司令塔のリモコン（control）を渡す
      name="name"            // どのデータを扱うか指定（型安全に補完されます）
      render={({ field }) => ( // fieldには onChange, onBlur, value, ref などが含まれる
        <FormItem>
          <FormLabel>名前</FormLabel>
          <FormControl>
            {/* {...field} を展開することで、Inputタグに必要な
                onChangeなどのイベントハンドラがすべて自動設定されます */}
            <Input placeholder="山田太郎" {...field} />
          </FormControl>
          {/* エラーがあればここに自動表示されます */}
          <FormMessage />
        </FormItem>
      )}
    />
    {/* ...他のフィールドも同様... */}
```

**ポイント**:
- `...field`: これを書くだけで、`value={field.value}` `onChange={field.onChange}` などがすべて展開されます。手動で `onChange` を書く必要はありません。
- `handleSubmit(onSubmit)`: これを使うことで、「バリデーションエラーがある場合は `onSubmit` を実行しない」という制御を自動でやってくれます。

## 4. もしこの技術を使わなかったら？（The Hard Way）

もし `useForm` を使わずに、Reactの標準機能（`useState`）だけで実装しようとすると、以下のようになります。

```tsx
// The Hard Way: useFormなしの場合
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  // 手動でバリデーションロジックを書く必要がある
  if (!name) {
    setErrors({ ...errors, name: '名前は必須です' });
    return;
  }
  if (name.length > 50) {
     // ...さらに条件分岐
  }
  // ...全フィールド分書く必要がある
  
  // 送信処理
};

return (
  <input 
    value={name} 
    onChange={(e) => setName(e.target.value)} // 毎回手動で更新
  />
);
```

**デメリット**:
- フィールドが増えるたびに `useState` とバリデーションロジックが肥大化します。
- 再レンダリングが多くなり、パフォーマンスが落ちます。

## 5. 技術選定とプロ視点の分析

- **採用理由**:
    1.  **型安全性**: TypeScript と Zod の組み合わせにより、フォームの入力値が型定義通りであることが保証されます。
    2.  **DX（開発体験）**: バリデーションロジックを UI から分離できるため、コードが読みやすくなります。
    3.  **shadcn/uiとの親和性**: shadcn/ui の Form コンポーネントは React Hook Form を前提に設計されており、アクセシビリティ（ARIA属性など）も自動で設定してくれます。
- **注意点**:
    - 非常に強力ですが、単純な検索窓ひとつだけのフォームなどにはオーバースペックになることがあります（その場合は単純な `ref` や `useState` でも十分です）。

## 6. さらなる理解のための推奨リソース

- [React Hook Form - Get Started](https://react-hook-form.com/get-started): まずはここから（英語ですがコード中心でわかりやすい）
- [Zod - Error Handling](https://zod.dev/?id=error-handling): エラーメッセージのカスタマイズ方法

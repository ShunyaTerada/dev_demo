import { test, expect } from '@playwright/test';


// テスト実行時のベースURLを設定（ローカル開発環境を想定）
test.use({ baseURL: 'http://localhost:3000' });

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('UI要素が正しく表示されること', async ({ page }) => {
    // タイトル確認
    await expect(page).toHaveTitle(/ログイン/); // タイトルに「ログイン」が含まれるか

    // 主要な要素の存在確認
    await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ゲストでログイン' })).toBeVisible();
});

test('必須入力チェックが機能すること', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'ログイン', exact: true });

    // 何も入力せずに送信
    await submitButton.click();

    // HTML5のrequired属性が効いているため、ページ遷移しない（URLが変わらない）ことを確認
    await expect(page).toHaveURL(/\/login/);

    // 補足: Playwrightでブラウザネイティブのバリデーションメッセージを検証するのは少し複雑なため
    // ここでは「送信がブロックされたこと」を確認するにとどめる
});

test('無効な認証情報でエラーが表示されること', async ({ page }) => {
    // 存在しないユーザー情報を入力
    await page.getByLabel('メールアドレス').fill('non-existent@example.com');
    await page.getByLabel('パスワード').fill('wrongpassword');

    // ログインボタンクリック
    await page.getByRole('button', { name: 'ログイン', exact: true }).click();

    // エラーアラートが表示されるのを待つ
    // login-form.tsxでは Alert コンポーネントが表示される
    await expect(page.getByRole('alert')).toBeVisible();

    // エラーメッセージの内容を確認（実装依存だが、何らかのテキストが含まれているはず）
    const alertText = await page.getByRole('alert').textContent();
    expect(alertText?.length).toBeGreaterThan(0);
});

test('パスワードの表示切り替えができること', async ({ page }) => {
    const passwordInput = page.getByLabel('パスワード');

    // 初期状態は password type（伏せ字）
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 表示切り替えボタンをクリック
    // パスワード入力欄と同じコンテナにあるボタンを探す
    // button要素の中にSVG（Eyeアイコン）があるはず
    const toggleButton = page.locator('div').filter({ has: page.getByLabel('パスワード') }).locator('button');
    await toggleButton.click();

    // text type（平文）に変わることを確認
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // もう一度クリックして戻ることを確認
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
});

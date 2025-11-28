# Gitリセット後の環境不整合とDockerコンテナの競合解決

**学習日**: 2025-11-28
**参照ドキュメント**:
- [npm docs: package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Docker docs: Container lifecycle](https://docs.docker.com/guides/walkthroughs/run-a-container/)

## 1. 概念と前提知識（The Big Picture）

### ソースコードと「状態」のズレ
Gitはあくまで「ソースコード（設計図）」の時系列を管理するツールであり、**「現在の環境の状態（実際に建っている建物）」までは管理しません。**

今回のトラブルは、この**「設計図（Git）」と「現場（ローカル環境）」のズレ**によって発生しました。

- **Git（設計図）**: 過去のバージョンに戻したため、`package.json` から `nuqs` というライブラリの記述が消えました。
- **node_modules（建材置き場）**: しかし、インストール済みのファイル群は自動では削除されません（あるいは、逆に必要なのにインストールされていない状態になります）。
- **Docker（稼働中の重機）**: 以前のコードで起動したデータベース（Supabase）が、終了されずに裏で動き続けていました。

開発においては、**「Gitを操作したら、環境（依存関係やプロセス）もそれに合わせて手動で同期させる必要がある」**という原則を理解することが重要です。

## 2. ライブラリのアプローチとロジック

### npm/pnpm の依存関係解決
パッケージマネージャー（pnpmなど）は、`package.json`（宣言）と `node_modules`（実体）を一致させる役割を持ちます。
Gitリセットを行うと、`package.json` だけが過去に戻りますが、`node_modules` はそのままか、整合性が取れない状態になります。

### Docker のコンテナ管理
Dockerコンテナは「名前（Name）」や「ポート（Port）」で一意に識別されます。
スクリプトがエラーで途中終了した場合、Dockerコンテナへの「停止命令」が届かず、コンテナが**ゾンビプロセス**として残り続けることがあります。
次に新しい環境を立ち上げようとした際、「その名前のコンテナは既に存在します（Conflict）」というエラーが発生します。

## 3. 実際のコードと文脈（Code Context）

今回発生した2つのエラーを振り返ります。

### ① ビルドエラー: `Module not found`
```bash
Module not found: Can't resolve 'nuqs/adapters/next/app'
```
- **状況**: ソースコード（`layout.tsx`）には `import ... from 'nuqs'` と書かれている。
- **原因**: Gitリセットにより `package.json` から `nuqs` が消えていたため、ビルドツールが「そんなライブラリは登録されていない」と判断しました。
- **解決**: `pnpm add nuqs` で `package.json` に再度登録し、実体をインストールしました。

### ② 起動エラー: `Conflict` / `container is not ready`
```bash
Error response from daemon: Conflict. The container name "/supabase_db_dev_demo" is already in use
```
- **状況**: `dev:all` スクリプトを実行したが、Supabaseが起動しない。
- **原因**: 前回のセッションで起動したSupabaseのコンテナが、正常に終了せずに残っていました。新しい起動コマンドが「同じ名前」でコンテナを作ろうとして衝突しました。
- **解決**: `docker rm -f`（または `supabase stop`）で古いコンテナを強制削除・停止し、場所を空けました。

## 4. もしこの技術を使わなかったら？（The Hard Way）

### Dockerがない場合
ローカルPCに直接 PostgreSQL や Supabase のバイナリをインストールして動かすことになります。
プロセスが競合した場合、タスクマネージャーや `kill` コマンドで、特定のプロセスID（PID）を探し出して強制終了させる必要があります。これは非常に手間がかかり、誤って別の重要なプロセスを消してしまうリスクもあります。
Dockerがあるおかげで、`docker stop` や `docker rm` という統一されたコマンドで安全に管理できています。

## 5. 技術選定とプロ視点の分析

### Git操作後の鉄則
プロのエンジニアは、Gitでブランチを切り替えたり（checkout）、過去に戻ったり（reset）した直後に、以下のコマンドを無意識に実行する習慣があります。

```bash
pnpm install  # 依存関係を package.json に合わせる
```

### 起動スクリプトの冪等性（べきとうせい）
今回使用している `start-dev.ps1` のような便利スクリプトは、開発を楽にしますが、エラー時のリカバリが隠蔽されがちです。
より堅牢なスクリプトにするなら、「起動する前に、既存の同名コンテナがあれば削除する」という**クリーンアップ処理**を先頭に入れるのが理想的です（冪等性の担保）。

## 6. さらなる理解のための推奨リソース

- **Docker コンテナのライフサイクル**: コンテナの `create`, `start`, `stop`, `rm` の流れを理解すると、トラブルに強くなります。
- **npm scripts**: `predev` や `postdev` などのフックを使って、起動前後のクリーニングを自動化する方法もあります。

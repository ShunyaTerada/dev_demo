# 開発環境一括起動スクリプト
# 1. Docker Desktopの起動確認と起動
# 2. Supabaseのローカル起動
# 3. Next.jsの開発サーバー起動

Write-Host "🚀 開発環境を起動します..." -ForegroundColor Cyan

# --- 1. Docker Desktopの確認と起動 ---
$dockerProcess = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
if (-not $dockerProcess) {
    Write-Host "🐳 Docker Desktopが起動していません。起動を試みます..." -ForegroundColor Yellow
    
    $dockerPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dockerPath) {
        Start-Process $dockerPath
        
        Write-Host "⏳ Dockerの準備ができるまで待機しています..." -ForegroundColor Gray
        # Dockerが応答するまでループ待機 (最大60秒程度)
        $retryCount = 0
        while (-not (docker info *>$null) -and $retryCount -lt 30) {
            Start-Sleep -Seconds 2
            Write-Host "." -NoNewline -ForegroundColor Gray
            $retryCount++
        }
        
        if ($retryCount -ge 30) {
            Write-Host "`n❌ Dockerの起動に時間がかかりすぎています。手動で確認してください。" -ForegroundColor Red
            exit 1
        }
        Write-Host "`n✅ Dockerが準備完了しました！" -ForegroundColor Green
    } else {
        Write-Host "❌ Docker Desktopが見つかりませんでした。インストール場所を確認してください。" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Docker Desktopは既に起動しています。" -ForegroundColor Green
}

# --- 2. Supabaseの起動 ---
Write-Host "⚡ Supabaseを起動しています..." -ForegroundColor Cyan
# npx supabase start はコンテナを起動して戻ってくるコマンドです
try {
    npx supabase start
    if ($LASTEXITCODE -ne 0) {
        throw "Supabase start failed"
    }
    Write-Host "✅ Supabaseの起動完了！" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabaseの起動に失敗しました。" -ForegroundColor Red
    exit 1
}

# --- 3. Next.js (pnpm dev) の起動 ---
Write-Host "✨ Next.js (pnpm dev) を起動します..." -ForegroundColor Cyan
pnpm dev

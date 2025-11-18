// データベース接続テスト
import postgres from "postgres";

const client = postgres(
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
);

async function testConnection() {
  try {
    // テーブル一覧を取得
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    console.log("📋 利用可能なテーブル:");
    tables.forEach((table) => {
      console.log(`  - ${table.table_name}`);
    });

    // petsテーブルが存在するかチェック
    const petTableExists = tables.some((table) => table.table_name === "pets");
    console.log(`\n🐕 petsテーブル: ${petTableExists ? "✅ 存在" : "❌ 不在"}`);

    await client.end();
  } catch (error) {
    console.error("❌ データベース接続エラー:", error.message);
  }
}

testConnection();

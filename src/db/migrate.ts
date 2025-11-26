import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// .env.local ファイルを読み込む
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in .env.local');
}

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
    console.log('🚀 マイグレーションを開始します...');

    await migrate(db, { migrationsFolder: './src/db/migrations' });

    console.log('✅ マイグレーションが完了しました！');

    await sql.end();
}

main().catch((err) => {
    console.error('❌ マイグレーションエラー:', err);
    process.exit(1);
});

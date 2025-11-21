import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous } from "better-auth/plugins";
import { db } from "../../db";
import * as schema from "../../db/schema/auth";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            // 単数形（標準）
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,

            // 複数形（エラー回避用）
            users: schema.user,
            sessions: schema.session,
            accounts: schema.account,
            verifications: schema.verification,
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        anonymous()
    ]
});

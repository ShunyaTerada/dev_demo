import "server-only";
import { betterAuth } from "better-auth";
import { nanoid } from "nanoid";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { anonymous } from "better-auth/plugins";
import { db } from "@/db";
import { getBaseURL } from "./get-base-url";
import * as schema from "@/db/schema/auth";

export const auth = betterAuth({
    baseURL: getBaseURL(),
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
    advanced: {
        generateId: () => nanoid(10),
    },
    plugins: [
        nextCookies(),
        anonymous()
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
});

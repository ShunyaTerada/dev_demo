import "server-only";
import { betterAuth } from "better-auth";
import { nanoid } from "nanoid";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db";
import { getBaseURL } from "./get-base-url";
import * as schema from "../db/schema/auth";

export const auth = betterAuth({
  baseURL: getBaseURL(),
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema
  }),
  advanced: {
    generateId: () => nanoid(10),
  },
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});
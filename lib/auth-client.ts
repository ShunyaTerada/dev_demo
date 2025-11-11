import { createAuthClient } from "better-auth/react";
import { getBaseURL } from "./get-base-url";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [inferAdditionalFields<typeof auth>()],
});
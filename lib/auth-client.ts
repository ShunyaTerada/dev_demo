import { createAuthClient } from "better-auth/react";
import { getBaseURL } from "./get-base-url";
import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
import { anonymous } from "better-auth/plugins/anonymous";

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
});
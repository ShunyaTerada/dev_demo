import { createAuthClient } from "better-auth/react";
import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins";
import { getBaseURL } from "./get-base-url";
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    plugins: [
        anonymousClient(),
        inferAdditionalFields<typeof auth>(),
    ]
});

import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export const verifySession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
};

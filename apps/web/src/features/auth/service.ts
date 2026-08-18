import { apiFetch } from "@/lib/api";

import type { CurrentUser } from "./types";

type ApiSuccess<T> = { data: T };

export async function getCurrentUser(demoUserId: string) {
  const response = await apiFetch<ApiSuccess<CurrentUser>>("/auth/me", {
    headers: { "x-demo-user-id": demoUserId },
  });
  return response.data;
}

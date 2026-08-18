const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiFailure = { error?: { code?: string; message?: string } };

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function getApiBaseUrl() {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }
  return apiBaseUrl;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiFailure | null;
    throw new ApiClientError(
      body?.error?.message ?? "요청을 처리하지 못했습니다.",
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function authenticatedApiFetch<T>(
  path: string,
  options: RequestInit = {},
) {
  const demoUserId = window.localStorage.getItem("demoUserId");
  if (!demoUserId) {
    throw new Error("로그인한 사용자를 찾을 수 없습니다.");
  }

  return apiFetch<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      "x-demo-user-id": demoUserId,
    },
  });
}

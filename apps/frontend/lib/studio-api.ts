export type StudioSession = {
  authenticated: boolean;
  username: string;
};

export async function studioFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(normalizePath(path), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      ...(unsafeMethod(init.method) ? { "X-CSRFToken": getCsrfToken() } : {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function ensureCsrf() {
  await fetch("/api/studio/csrf", { credentials: "include" });
}

function unsafeMethod(method = "GET") {
  return !["GET", "HEAD", "OPTIONS", "TRACE"].includes(method.toUpperCase());
}

function getCsrfToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie.split("; ").find((part) => part.startsWith("csrftoken="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

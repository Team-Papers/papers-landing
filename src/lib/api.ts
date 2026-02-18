const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  user: UserData;
  tokens: AuthTokens;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      return { error: body?.message || `Erreur ${res.status}` };
    }

    return { data: body as T };
  } catch {
    return { error: "Impossible de contacter le serveur" };
  }
}

export async function apiLogin(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> {
  return apiFetch<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...data, role: "READER" }),
  });
}

export async function apiGetMe(token: string): Promise<ApiResponse<UserData>> {
  return apiFetch<UserData>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function apiLogout(refreshToken: string): Promise<ApiResponse<void>> {
  return apiFetch<void>("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export function saveTokens(tokens: AuthTokens) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

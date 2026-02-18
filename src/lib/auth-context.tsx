"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  apiLogin,
  apiRegister,
  apiGetMe,
  apiLogout,
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  type UserData,
} from "./api";

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    apiGetMe(token).then((res) => {
      if (res.data) setUser(res.data);
      else clearTokens();
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    const res = await apiLogin(email, password);
    if (res.error) return res.error;
    if (res.data) {
      saveTokens(res.data.tokens);
      setUser(res.data.user);
    }
    return null;
  }, []);

  const register = useCallback(
    async (data: { firstName: string; lastName: string; email: string; password: string }): Promise<string | null> => {
      const res = await apiRegister(data);
      if (res.error) return res.error;
      if (res.data) {
        saveTokens(res.data.tokens);
        setUser(res.data.user);
      }
      return null;
    },
    []
  );

  const logout = useCallback(async () => {
    const rt = getRefreshToken();
    if (rt) await apiLogout(rt);
    clearTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

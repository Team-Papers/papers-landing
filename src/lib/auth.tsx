"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { signInWithPopup } from "firebase/auth";
import { getFirebaseAuth, getGoogleProvider } from "@/lib/firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  role: string;
  emailVerified: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function saveSession(user: User, accessToken: string, refreshToken: string) {
  localStorage.setItem("papers_user", JSON.stringify(user));
  localStorage.setItem("papers_token", accessToken);
  localStorage.setItem("papers_refresh", refreshToken);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    const stored = localStorage.getItem("papers_user");
    const token = localStorage.getItem("papers_token");
    if (stored && token) {
      try {
        setState({ user: JSON.parse(stored), loading: false });
      } catch {
        setState({ user: null, loading: false });
      }
    } else {
      setState({ user: null, loading: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!json.success) return { success: false, message: json.message || "Erreur de connexion" };

      const { user, accessToken, refreshToken } = json.data;
      saveSession(user, accessToken, refreshToken);
      setState({ user, loading: false });
      return { success: true };
    } catch {
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  }, []);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) return { success: false, message: json.message || "Erreur lors de l'inscription" };

      const { user, accessToken, refreshToken } = json.data;
      saveSession(user, accessToken, refreshToken);
      setState({ user, loading: false });
      return { success: true };
    } catch {
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const json = await res.json();
      if (!json.success) return { success: false, message: json.message || "Erreur avec Google" };

      const { user, accessToken, refreshToken } = json.data;
      saveSession(user, accessToken, refreshToken);
      setState({ user, loading: false });
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error && err.message.includes("popup-closed")
        ? "Connexion annulee"
        : "Erreur de connexion avec Google";
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("papers_user");
    localStorage.removeItem("papers_token");
    localStorage.removeItem("papers_refresh");
    setState({ user: null, loading: false });
  }, []);

  const updateUser = useCallback((partial: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...partial };
      localStorage.setItem("papers_user", JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

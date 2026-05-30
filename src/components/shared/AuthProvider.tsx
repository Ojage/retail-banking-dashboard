"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { User } from "@/types";

const DEMO_STORAGE_KEY = "retbankx_demo_user";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  demoLogin: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
        setLoading(false);
        return;
      } catch {
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
      }
    }

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser((data as { user?: User }).user ?? null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { user?: User; error?: string };
      if (res.ok && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error ?? "Login failed." };
    },
    []
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { user?: User; error?: string };
      if (res.ok && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error ?? "Signup failed." };
    },
    []
  );

  const demoLogin = useCallback(() => {
    const demoUser: User = {
      id: "demo-user",
      email: "demo@retbankx.com",
      name: "Demo User",
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const logout = useCallback(async () => {
    sessionStorage.removeItem(DEMO_STORAGE_KEY);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return ctx;
}

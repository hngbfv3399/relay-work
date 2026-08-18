"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { ApiClientError } from "@/lib/api";

import { getCurrentUser } from "./service";
import type { CurrentUser } from "./types";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: CurrentUser | null;
  signIn: (demoUserId: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const demoUserIdKey = "demoUserId";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let active = true;

    if (pathname === "/login") {
      return () => {
        active = false;
      };
    }

    const demoUserId = window.localStorage.getItem(demoUserIdKey);
    if (!demoUserId) {
      router.replace("/login");
      return () => {
        active = false;
      };
    }

    void getCurrentUser(demoUserId)
      .then((currentUser) => {
        if (!active) return;
        setUser(currentUser);
        setStatus("authenticated");
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof ApiClientError && error.status === 401) {
          window.localStorage.removeItem(demoUserIdKey);
        }
        setUser(null);
        setStatus("anonymous");
        router.replace("/login");
      });

    return () => {
      active = false;
    };
  }, [pathname, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      async signIn(demoUserId) {
        const currentUser = await getCurrentUser(demoUserId);
        window.localStorage.setItem(demoUserIdKey, currentUser.id);
        setUser(currentUser);
        setStatus("authenticated");
      },
      signOut() {
        window.localStorage.removeItem(demoUserIdKey);
        setUser(null);
        setStatus("anonymous");
        router.replace("/");
      },
    }),
    [router, status, user],
  );

  if (pathname !== "/login" && status !== "authenticated") {
    return (
      <main className="grid min-h-dvh place-items-center bg-slate-50 text-sm text-slate-500">
        사용자 정보를 확인하고 있습니다.
      </main>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  return context;
}

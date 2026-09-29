"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AuthUser,
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  AUTH_CHANGE_EVENT,
  ROLE_PORTAL_MAP,
} from "@/lib/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  // Initialize lazily from client storage
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    return getCurrentUser();
  });
  const [isLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent<AuthUser | null>;
      setUser(customEvent.detail ?? getCurrentUser());
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = useCallback(
    (authUser: AuthUser, redirect = true) => {
      setCurrentUser(authUser);
      setUser(authUser);
      if (redirect) {
        const target = ROLE_PORTAL_MAP[authUser.role] || "/dashboard";
        router.push(target);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    router.push("/sign-in");
  }, [router]);

  return {
    user,
    role: user?.role || null,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };
}

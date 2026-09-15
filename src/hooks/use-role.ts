"use client";

import { useSearchParams } from "next/navigation";

export type UserRole = "landlord" | "agent" | "tenant" | "vendor" | "admin";

export function useRole(): UserRole | null {
  const role = useSearchParams().get("role");
  return role && ["landlord", "agent", "tenant", "vendor", "admin"].includes(role)
    ? (role as UserRole)
    : null;
}

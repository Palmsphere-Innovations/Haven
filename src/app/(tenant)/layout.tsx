import type { ReactNode } from "react";
import { PortalShell } from "@/components/shared/portal-shell";
export default function TenantLayout({ children }: { children: ReactNode }) {
  return <PortalShell role="tenant">{children}</PortalShell>;
}

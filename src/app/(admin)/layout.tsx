import type { ReactNode } from "react";
import { PortalShell } from "@/components/shared/portal-shell";
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <PortalShell role="admin">{children}</PortalShell>;
}

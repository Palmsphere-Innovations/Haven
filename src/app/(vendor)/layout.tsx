import type { ReactNode } from "react";
import { PortalShell } from "@/components/shared/portal-shell";
export default function VendorLayout({ children }: { children: ReactNode }) {
  return <PortalShell role="vendor">{children}</PortalShell>;
}

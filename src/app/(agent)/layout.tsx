import type { ReactNode } from "react";
import { PortalShell } from "@/components/shared/portal-shell";
export default function AgentLayout({ children }: { children: ReactNode }) {
  return <PortalShell role="agent">{children}</PortalShell>;
}

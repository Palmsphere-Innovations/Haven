"use client";
import { LayoutDashboard, FileUser, Wrench, FileText } from "lucide-react";
import { RoleSidebar, type RoleNavItem } from "@/components/shared/role-sidebar";
export function TenantSidebar(props: { collapsed: boolean; onClose: () => void; onToggle: () => void }) {
  const items: RoleNavItem[] = [{ label: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard }, { label: "Application", href: "/tenant/application", icon: FileUser }, { label: "Maintenance", href: "/tenant/maintenance", icon: Wrench }, { label: "Contracts", href: "/tenant/contracts", icon: FileText }];
  return <RoleSidebar {...props} title="Tenant" items={items} prefix="/tenant" />;
}

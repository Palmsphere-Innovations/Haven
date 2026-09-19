"use client";
import { LayoutDashboard, ShieldCheck, Gavel, ScrollText } from "lucide-react";
import { RoleSidebar, type RoleNavItem } from "@/components/shared/role-sidebar";
export function AdminSidebar(props: { collapsed: boolean; onClose: () => void; onToggle: () => void }) {
  const items: RoleNavItem[] = [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }, { label: "Compliance", href: "/admin/compliance", icon: ShieldCheck }, { label: "Disputes", href: "/admin/disputes", icon: Gavel }, { label: "Audit Log", href: "/admin/audit-log", icon: ScrollText }];
  return <RoleSidebar {...props} title="Admin" items={items} prefix="/admin" />;
}

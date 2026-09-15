"use client";
import { LayoutDashboard, BriefcaseBusiness, Users, SearchCheck, Wrench, ShieldCheck } from "lucide-react";
import { RoleSidebar, type RoleNavItem } from "@/components/shared/role-sidebar";
export function AgentSidebar(props: { collapsed: boolean; onClose: () => void; onToggle: () => void }) {
  const items: RoleNavItem[] = [
    { label: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard }, { label: "Portfolio", href: "/agent/portfolio", icon: BriefcaseBusiness }, { label: "Tenants", href: "/agent/tenants", icon: Users }, { label: "Screening", href: "/agent/screening", icon: SearchCheck }, { label: "Vendors", href: "/agent/vendors", icon: Wrench }, { label: "Compliance", href: "/agent/compliance", icon: ShieldCheck },
  ];
  return <RoleSidebar {...props} title="Agent" items={items} prefix="/agent" />;
}

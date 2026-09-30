"use client";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  SearchCheck,
  Wrench,
  ShieldCheck,
  FileText,
  MessageSquare,
  Gavel,
} from "lucide-react";
import { RoleSidebar, type RoleNavItem } from "@/components/shared/role-sidebar";
export function AgentSidebar(props: { collapsed: boolean; onClose: () => void; onToggle: () => void }) {
  const items: RoleNavItem[] = [
    { label: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
    { label: "Portfolio", href: "/agent/portfolio", icon: BriefcaseBusiness },
    { label: "Tenants", href: "/agent/tenants", icon: Users },
    { label: "Screening", href: "/agent/screening", icon: SearchCheck },
    { label: "Vendors", href: "/agent/vendors", icon: Wrench },
    { label: "Compliance", href: "/agent/compliance", icon: ShieldCheck },
    { label: "Maintenance", href: "/agent/maintenance", icon: Wrench },
    { label: "Documents", href: "/agent/documents", icon: FileText },
    { label: "Communication", href: "/agent/communication", icon: MessageSquare },
    { label: "Disputes", href: "/agent/disputes", icon: Gavel },
  ];
  return <RoleSidebar {...props} title="Agent" items={items} prefix="/agent" />;
}

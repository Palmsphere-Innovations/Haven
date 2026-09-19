import {
  BriefcaseBusiness,
  FileText,
  Gavel,
  LayoutDashboard,
  MessageSquare,
  SearchCheck,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { SidebarNavItem } from "@/components/shared/sidebar";

export const agentNavItems: SidebarNavItem[] = [
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

import {
  BriefcaseBusiness,
  LayoutDashboard,
  ReceiptText,
} from "lucide-react";
import type { SidebarNavItem } from "@/components/shared/sidebar";

export const vendorNavItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/vendor/jobs", icon: BriefcaseBusiness },
  { label: "Invoices", href: "/vendor/invoices", icon: ReceiptText },
];

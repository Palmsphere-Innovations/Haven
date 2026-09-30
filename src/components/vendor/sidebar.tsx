"use client";
import { LayoutDashboard, BriefcaseBusiness, ReceiptText } from "lucide-react";
import { RoleSidebar, type RoleNavItem } from "@/components/shared/role-sidebar";
export function VendorSidebar(props: { collapsed: boolean; onClose: () => void; onToggle: () => void }) {
  const items: RoleNavItem[] = [{ label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard }, { label: "Jobs", href: "/vendor/jobs", icon: BriefcaseBusiness }, { label: "Invoices", href: "/vendor/invoices", icon: ReceiptText }];
  return <RoleSidebar {...props} title="Vendor" items={items} prefix="/vendor" />;
}

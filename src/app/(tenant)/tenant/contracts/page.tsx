import { TenantContractsWorkspace } from "@/components/tenant/portal-workspaces";
import { FileText, ShieldCheck } from "lucide-react";

export default function TenantContractsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col gap-2 border-b border-[#ECEEED] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] px-2.5 py-0.5 text-xs font-semibold text-[#2A5240] w-fit">
          <ShieldCheck className="h-3.5 w-3.5" />
          Tenant Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Contracts & Receipts
        </h1>
        <p className="text-sm text-gray-500">
          Securely access your executed AST, receipts, deposit certificate and inventory report.
        </p>
      </div>

      <TenantContractsWorkspace />
    </div>
  );
}

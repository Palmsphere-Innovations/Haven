import { ChevronRight, Wrench, VolumeX, Receipt, UploadCloud } from "lucide-react";

export function ContactHeader({
  propertyAddress,
  contactName,
  contactRole,
}: {
  propertyAddress: string;
  contactName: string;
  contactRole: "Landlord" | "Agent";
}) {
  return (
    <div className="mb-6 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <span>My Home</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span>{propertyAddress}</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-brand font-semibold">Contact</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Contact</h1>
        <p className="text-sm text-stone-500 mt-1">
          Your {contactRole.toLowerCase()}: <span className="font-semibold text-stone-900">{contactName}</span>
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <QuickAction icon={Wrench} label="Submit Maintenance Request" />
        <QuickAction icon={VolumeX} label="Report an Issue" />
        <QuickAction icon={Receipt} label="Rent Query" />
        <QuickAction icon={UploadCloud} label="Upload Document" />
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label }: { icon: typeof Wrench; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#ECEEED] shadow-sm hover:bg-[#F9F9F8] transition-colors text-xs font-medium text-stone-700 whitespace-nowrap"
    >
      <Icon className="w-3.5 h-3.5 text-brand" />
      {label}
    </button>
  );
}

import { Phone, Mail, Clock } from "lucide-react";

export function ContactInfoCard({
  name,
  role,
  company,
  phone,
  email,
  availability,
}: {
  name: string;
  role: string;
  company?: string;
  phone: string;
  email: string;
  availability: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-sm space-y-4">
      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide">
        Your Contact
      </span>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold text-sm">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-semibold text-stone-900 text-sm">{name}</p>
          <p className="text-xs text-stone-500">{role}</p>
          {company && <p className="text-xs text-brand font-medium">{company}</p>}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#ECEEED] text-xs">
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center justify-between text-stone-600 hover:text-brand transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Phone
          </span>
          <span className="font-mono">{phone}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center justify-between text-stone-600 hover:text-brand transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </span>
          <span className="truncate max-w-[140px]">{email}</span>
        </a>
        <div className="flex items-center justify-between text-stone-600">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Available
          </span>
          <span>{availability}</span>
        </div>
      </div>
    </div>
  );
}

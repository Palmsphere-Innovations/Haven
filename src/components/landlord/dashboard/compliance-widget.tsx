"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Gavel, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceOrderModal } from "@/components/landlord/documents/modals/service-order-modal";
import { complianceCertificates, type ComplianceItem } from "@/lib/mock/compliance";
import { propertiesData } from "@/lib/mock/properties";

interface ComplianceWidgetProps {
  certificates?: ComplianceItem[];
  totalProperties?: number;
}

export const ComplianceWidget: React.FC<ComplianceWidgetProps> = ({
  certificates = complianceCertificates,
  totalProperties = propertiesData.length,
}) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{ property: string; service: string }>({
    property: "Flat 4B, 18 Kensington Gdns",
    service: "Gas Safety (CP12)",
  });
  const [bookingNotice, setBookingNotice] = useState<string | null>(null);

  // Find statutory alerts dynamically
  const urgentAlerts = useMemo(() => {
    const alerts: Array<{
      id: string;
      title: string;
      property: string;
      status: string;
      type: "action" | "warning";
      service: string;
      regText: string;
    }> = [];

    certificates.forEach((cert) => {
      if (cert.gasType === "warning" || cert.gasType === "action") {
        alerts.push({
          id: `${cert.id}-gas`,
          title: "Gas Safety (CP12)",
          property: cert.property,
          status: cert.gasStatus,
          type: cert.gasType,
          service: "Gas Safety (CP12)",
          regText: "Reg 36 Compliance",
        });
      }
      if (cert.epcType === "action" || cert.epcType === "warning") {
        alerts.push({
          id: `${cert.id}-epc`,
          title: "Energy Performance (EPC)",
          property: cert.property,
          status: cert.epcStatus,
          type: cert.epcType,
          service: "EPC Domestic Assessment",
          regText: "MEES Regulations",
        });
      }
      if (cert.eicrType === "action" || cert.eicrType === "warning") {
        alerts.push({
          id: `${cert.id}-eicr`,
          title: "Electrical Safety (EICR)",
          property: cert.property,
          status: cert.eicrStatus,
          type: cert.eicrType,
          service: "5-Year EICR Inspection",
          regText: "Part P Compliance",
        });
      }
    });

    return alerts.slice(0, 2);
  }, [certificates]);

  const handleOpenBooking = (property: string, service: string) => {
    setSelectedBooking({ property, service });
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = () => {
    setIsBookingOpen(false);
    setBookingNotice(`Engineer successfully dispatched for ${selectedBooking.service} at ${selectedBooking.property}`);
    setTimeout(() => setBookingNotice(null), 4000);
  };

  return (
    <div className="bg-[#132A20] text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Statutory Compliance
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#A3B8AD] text-[10px] font-semibold uppercase tracking-wider">
            UK Regs
          </span>
        </div>
        <p className="text-xs text-[#A3B8AD] mt-3 leading-relaxed">
          Section 11 Landlord &amp; Tenant Act 1985 and Deregulation Act 2015 index.
        </p>

        {bookingNotice && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{bookingNotice}</span>
          </div>
        )}

        <div className="flex flex-col gap-3.5 mt-5">
          {urgentAlerts.length > 0 ? (
            urgentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col gap-2 ${
                  alert.type === "action"
                    ? "bg-rose-950/40 border-rose-500/30"
                    : "bg-white/10 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{alert.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      alert.type === "action"
                        ? "bg-rose-500/20 text-rose-200 border-rose-400/30"
                        : "bg-amber-500/20 text-amber-200 border-amber-400/30"
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#A3B8AD]">
                  <span>{alert.property}</span>
                  <span className="font-mono text-white font-medium">{alert.regText}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#A3B8AD]">{alert.regText}</span>
                  <Button
                    size="sm"
                    onClick={() => handleOpenBooking(alert.property, alert.service)}
                    className="bg-white hover:bg-gray-100 text-[#132A20] text-xs font-semibold h-7 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Book Service
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All properties currently meet statutory compliance requirements.</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 mt-4 border-t border-white/10">
        <Link
          href="/documents"
          className="text-xs font-medium text-white/90 hover:text-white flex items-center justify-between group"
        >
          <span>Open Compliance Vault ({totalProperties} Properties)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {isBookingOpen && (
        <ServiceOrderModal
          property={selectedBooking.property}
          service={selectedBooking.service}
          onClose={handleBookingSuccess}
        />
      )}
    </div>
  );
};

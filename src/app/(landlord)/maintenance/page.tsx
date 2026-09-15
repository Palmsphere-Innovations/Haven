"use client";

import React, { useState } from "react";
import { MaintenanceHeader } from "@/components/landlord/maintenance/maintenance-header";
import { MaintenanceStats } from "@/components/landlord/maintenance/maintenance-stats";
import { MaintenanceTable, type MaintenanceTicket } from "@/components/landlord/maintenance/maintenance-table";
import { maintenanceTickets } from "@/lib/data/mock-data";
import { LogRequestModal } from "@/components/landlord/maintenance/modals/log-request-modal";
import { AssignContractorDrawer } from "@/components/landlord/maintenance/modals/assign-contractor-drawer";

export default function MaintenancePage() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(maintenanceTickets);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selected, setSelected] = useState<MaintenanceTicket | null>(null);
  return (
    <div className="space-y-8">
      <MaintenanceHeader onLogRequest={() => setRequestOpen(true)} />
      <MaintenanceStats />
      <MaintenanceTable tickets={tickets} onSelect={setSelected} />
      {requestOpen && <LogRequestModal onClose={() => setRequestOpen(false)} onAdd={(ticket) => setTickets((current) => [ticket, ...current])} />}
      {selected && <AssignContractorDrawer ticket={selected} onClose={() => setSelected(null)} onUpdate={(ticket) => setTickets((current) => current.map((item) => item.id === ticket.id ? ticket : item))} />}
    </div>
  );
}
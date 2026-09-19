"use client";

import React, { useState } from "react";
import { MaintenanceHeader } from "@/components/agent/maintenance/maintenance-header";
import { MaintenanceStats } from "@/components/agent/maintenance/maintenance-stats";
import {
  MaintenanceTable,
} from "@/components/agent/maintenance/maintenance-table";
import { agentMaintenanceTickets } from "@/lib/mock/agent-operations";
import { LogRequestModal } from "@/components/agent/maintenance/modals/log-request-modal";
import { AssignContractorDrawer } from "@/components/agent/maintenance/modals/assign-contractor-drawer";
import type { MaintenanceTicket } from "@/lib/mock/maintenance";

export default function MaintenancePage() {
  const [tickets, setTickets] =
    useState<MaintenanceTicket[]>(agentMaintenanceTickets);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selected, setSelected] = useState<MaintenanceTicket | null>(null);

  return (
    <div className="space-y-8">
      <MaintenanceHeader onLogRequest={() => setRequestOpen(true)} />
      <MaintenanceStats />
      <MaintenanceTable tickets={tickets} onSelect={setSelected} />
      {requestOpen && (
        <LogRequestModal
          onClose={() => setRequestOpen(false)}
          onAdd={(ticket) => setTickets((current) => [ticket, ...current])}
        />
      )}
      {selected && (
        <AssignContractorDrawer
          ticket={selected}
          onClose={() => setSelected(null)}
          onUpdate={(ticket) =>
            setTickets((current) =>
              current.map((item) => (item.id === ticket.id ? ticket : item)),
            )
          }
        />
      )}
    </div>
  );
}

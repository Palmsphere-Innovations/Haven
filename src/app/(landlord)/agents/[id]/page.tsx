"use client";

import React, { use } from "react";
import { AgentDetailHeader, AgentDetail } from "@/components/landlord/agents/detail/agenst-detail-header";
import { AgentAuthorityScope } from "@/components/landlord/agents/detail/agent-authority-scope";
import { AgentAssignedProperties, AssignedProperty } from "@/components/landlord/agents/detail/agents-assigned-properties";
import { AgentActivityTimeline } from "@/components/landlord/agents/detail/agents-activity-timeline";

const mockAgentStore: Record<string, { agent: AgentDetail; properties: AssignedProperty[] }> = {
  "1": {
    agent: {
      id: "1",
      name: "Eleanor Vance",
      initials: "EV",
      agency: "Prime Heritage Management Ltd",
      email: "eleanor.vance@primeheritage.co.uk",
      phone: "+44 20 7946 0832",
      location: "Mayfair, London W1J",
      assignedDate: "14 Jan 2024",
      authId: "#UK-AG-8842",
      status: "Active Management Authority",
      tierName: "Tier 2 Authority",
    },
    properties: [
      {
        id: "p1",
        title: "Flat 4B, 18 Kensington Gdns",
        ref: "#KG-04B",
        tenant: "Oliver Davies & C. Finch",
        astType: "AST • 18-month Fixed",
        grantStart: "14 Jan 2024",
        grantExpiry: "31 Dec 2026",
        daysRemaining: "(248d left)",
        status: "Active Grant",
      },
      {
        id: "p2",
        title: "8 Camden Mews",
        ref: "#CM-08M",
        tenant: "Elena Rostova",
        astType: "AST • Periodic",
        grantStart: "01 Jun 2024",
        grantExpiry: "15 Oct 2026",
        daysRemaining: "(Fixed Term)",
        status: "Active Grant",
      },
      {
        id: "p3",
        title: "27 Blenheim Crescent",
        ref: "#BC-27N",
        tenant: "Marcus Vance",
        astType: "Family Tenancy Trust",
        grantStart: "15 Oct 2024",
        grantExpiry: "Continuous",
        daysRemaining: "(Annual review)",
        status: "Active Grant",
      },
    ],
  },
};

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const data = mockAgentStore[resolvedParams.id] || mockAgentStore["1"];

  return (
    <div className="space-y-6">
      <AgentDetailHeader agent={data.agent} />
      <AgentAuthorityScope />
      <AgentAssignedProperties properties={data.properties} />
      <AgentActivityTimeline />
    </div>
  );
}
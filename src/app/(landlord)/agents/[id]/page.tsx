"use client";

import React, { use } from "react";
import { AgentDetailHeader } from "@/components/landlord/agents/detail/agenst-detail-header";
import { AgentAuthorityScope } from "@/components/landlord/agents/detail/agent-authority-scope";
import { AgentAssignedProperties } from "@/components/landlord/agents/detail/agents-assigned-properties";
import { AgentActivityTimeline } from "@/components/landlord/agents/detail/agents-activity-timeline";
import { agentDataStore } from "@/lib/data/mock-data";

// interface

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const data = agentDataStore[resolvedParams.id] || agentDataStore["1"];

  return (
    <div className="space-y-6">
      <AgentDetailHeader agent={data.agent} />
      <AgentAuthorityScope />
      <AgentAssignedProperties properties={data.properties} />
      <AgentActivityTimeline />
    </div>
  );
}
import React from 'react';
import { AgentHeader } from '@/components/agent/dashboard/AgentsHeader';
import { StatCards } from '@/components/agent/dashboard/StatCards';
import { AuthorityMandates } from '@/components/agent/dashboard/AuthorityMandates';
import { WorkorderQueue } from '@/components/agent/dashboard/WorkorderQueue';
import { InspectionsAndCompliance } from '@/components/agent/dashboard/InspectionsAndCompliance';
import { RegulatoryFooter } from '@/components/agent/dashboard/RegulatoryFooter';

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 md:p-8">
      {/* Agent Identity & Mandate Header */}
      <AgentHeader />

      {/* Key Metric Stats Cards */}
      <StatCards />

      {/* Active Authority Mandates (Grants) */}
      <AuthorityMandates />

      {/* Core Grid: Workorders Queue (Left) & Inspections/Compliance (Right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WorkorderQueue />
        </div>
        <div className="lg:col-span-1">
          <InspectionsAndCompliance />
        </div>
      </div>

      {/* Statutory Regulatory Audit Footer */}
      <RegulatoryFooter />
    </div>
  );
}
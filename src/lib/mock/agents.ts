import { propertiesData } from "./properties";

export interface AgentRecord {
  id: string;
  name: string;
  initials: string;
  agency: string;
  email: string;
  phone: string;
  location: string;
  assignedDate: string;
  authId: string;
  tier: "Full Management" | "Maintenance + Communication" | "Maintenance-only";
  tierColor: string;
  propertiesCount: number;
  portfolioScope: string;
  status: "Active" | "Pending Handover" | "Revoked";
  statusColor: string;
  revokeWarning: string;
  assignedPropertyCodes: string[]; // Links to PropertyRecord.code
}

export interface AssignedAgentProperty {
  id: string;
  title: string;
  ref: string;
  tenant: string;
  astType: string;
  grantStart: string;
  grantExpiry: string;
  daysRemaining: string;
  status: string;
}

export interface AgentDetail {
  agent: AgentRecord;
  properties: AssignedAgentProperty[];
}


/* ==========================================
   5. AGENTS DATA & LOOKUP STORE
   ========================================== */

export const agentsData: AgentRecord[] = [
  {
    id: "1",
    name: "Eleanor Vance",
    initials: "EV",
    agency: "Prime Heritage Management Ltd",
    email: "eleanor.vance@primeheritage.co.uk",
    phone: "+44 20 7946 0832",
    location: "Mayfair, London W1J",
    assignedDate: "14 Jan 2024",
    authId: "#UK-AG-8842",
    tier: "Full Management",
    tierColor: "bg-[#EEF2F6] text-[#1E293B] border-[#CBD5E1]",
    propertiesCount: 3,
    portfolioScope: "Kensington & Camden Portfolio",
    status: "Active",
    statusColor: "bg-[#EAF4ED] text-[#1E5E2F] border-emerald-200",
    revokeWarning: "Triggers statutory portfolio handover notification & deposit transfer checklist.",
    assignedPropertyCodes: ["KG-4B", "CM-08", "BC-27"],
  },
  {
    id: "2",
    name: "Julian Thorne",
    initials: "JT",
    agency: "Belgrave Property Management",
    email: "j.thorne@belgravepm.co.uk",
    phone: "+44 20 7946 0991",
    location: "Camden, London NW1",
    assignedDate: "01 Jun 2024",
    authId: "#UK-AG-2091",
    tier: "Maintenance + Communication",
    tierColor: "bg-[#E0F2F1] text-[#00695C] border-[#B2DFDB]",
    propertiesCount: 2,
    portfolioScope: "Camden & Islington Portfolio",
    status: "Active",
    statusColor: "bg-[#EAF4ED] text-[#1E5E2F] border-emerald-200",
    revokeWarning: "Tenants will be prompted for direct landlord ticketing fallback.",
    assignedPropertyCodes: ["CM-08", "SJ-03A"],
  },
  {
    id: "3",
    name: "Siobhan Campbell",
    initials: "SC",
    agency: "Apex Residential London",
    email: "s.campbell@apexresidential.co.uk",
    phone: "+44 20 7946 0411",
    location: "Richmond, Surrey TW10",
    assignedDate: "15 Oct 2024",
    authId: "#UK-AG-3088",
    tier: "Full Management",
    tierColor: "bg-[#EEF2F6] text-[#1E293B] border-[#CBD5E1]",
    propertiesCount: 1,
    portfolioScope: "Richmond & Surrey Portfolio",
    status: "Active",
    statusColor: "bg-[#EAF4ED] text-[#1E5E2F] border-emerald-200",
    revokeWarning: "Full inspection records and tenancy agreements export required.",
    assignedPropertyCodes: ["RM-12"],
  },
  {
    id: "4",
    name: "Marcus Sterling",
    initials: "MS",
    agency: "Sterling & Co Chartered Surveyors",
    email: "m.sterling@sterling-surveyors.co.uk",
    phone: "+44 20 7946 0112",
    location: "Ruislip, London HA4",
    assignedDate: "01 Feb 2025",
    authId: "#UK-AG-5012",
    tier: "Maintenance-only",
    tierColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    propertiesCount: 1,
    portfolioScope: "Commercial & Mixed-use Units",
    status: "Active",
    statusColor: "bg-[#EAF4ED] text-[#1E5E2F] border-emerald-200",
    revokeWarning: "Open contractor job orders must be reassigned prior to revocation.",
    assignedPropertyCodes: ["GV-07"],
  },
  {
    id: "5",
    name: "Clara Oswald",
    initials: "CO",
    agency: "Kensington Lettings Consortium",
    email: "c.oswald@klc-estates.co.uk",
    phone: "+44 20 7946 0773",
    location: "Kensington, London W2",
    assignedDate: "10 Aug 2024",
    authId: "#UK-AG-7019",
    tier: "Full Management",
    tierColor: "bg-[#EEF2F6] text-[#1E293B] border-[#CBD5E1]",
    propertiesCount: 1,
    portfolioScope: "Transferring to Belgrave PM",
    status: "Pending Handover",
    statusColor: "bg-amber-50 text-amber-800 border-amber-200",
    revokeWarning: "Handover in progress. Revoking will immediately suspend remaining portal read-rights.",
    assignedPropertyCodes: ["EW-14"],
  },
  {
    id: "6",
    name: "David Henstridge",
    initials: "DH",
    agency: "Vanguard Realty Services",
    email: "d.henstridge@vanguardrealty.co.uk",
    phone: "+44 20 7946 0998",
    location: "London EC1",
    assignedDate: "12 Oct 2023",
    authId: "#UK-AG-0012",
    tier: "Maintenance-only",
    tierColor: "bg-[#F9F9F8] text-stone-500 border-[#ECEEED]",
    propertiesCount: 0,
    portfolioScope: "Revoked 12 Oct 2025",
    status: "Revoked",
    statusColor: "bg-stone-100 text-stone-500 border-stone-200",
    revokeWarning: "Access Terminated",
    assignedPropertyCodes: [],
  },
];

export const agentDataStore: Record<string, AgentDetail> = Object.fromEntries(
  agentsData.map((agent) => {
    const matchedProperties: AssignedAgentProperty[] = propertiesData
      .filter((p) => agent.assignedPropertyCodes.includes(p.code))
      .map((p) => ({
        id: p.id,
        title: p.title,
        ref: `#${p.code}`,
        tenant: p.occupant,
        astType: p.tenancyInfo,
        grantStart: agent.assignedDate,
        grantExpiry: "31 Dec 2026",
        daysRemaining: "(Active Grant)",
        status: "Active Grant",
      }));

    return [agent.id, { agent, properties: matchedProperties }];
  })
) as Record<string, AgentDetail>;

export function getAgentDetail(id: string): AgentDetail {
  return agentDataStore[id] || agentDataStore["1"]
};
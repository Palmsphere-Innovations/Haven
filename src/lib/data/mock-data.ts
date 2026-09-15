import type { PropertyRecord } from "@/components/landlord/properties/properties-table";
import type { MaintenanceTicket } from "@/components/landlord/maintenance/maintenance-table";
// import type { ComplianceItem } from "@/components/landlord/documents/compliance-matrix";

/* ==========================================
   1. TYPE DEFINITIONS
   ========================================== */

export interface TenantRecord {
  id: string;
  initials: string;
  names: string;
  jointWith?: string;
  contact: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  termType: string;
  rent: string;
  paymentMethod: string;
  ledgerStatus: "Paid" | "Overdue (14 days)" | "Overdue (7 days)" | "Due in 3 days" | "Awaiting Setup" | "—";
  ledgerBadgeStyle: string;
  inviteStatus: string;
  isInvitePending?: boolean;
}

export interface TenantDetail extends TenantRecord {
  authId: string;
  email: string;
  phone: string;
  commencedDate: string;
  rentAmount: string;
  arrears: string;
  nextDue: string;
  fixedTerm: string;
  remainingMonths: string;
  depositAmount: string;
  depositScheme: string;
  oversightAgent: string;
  agencyName: string;
  vettingTier: string;
  emergencyContact: string;
}

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

export interface ComplianceItem {
  id: string;
  property: string;
  address: string;
  gasStatus: string;
  gasType: "valid" | "warning" | "action";
  epcStatus: string;
  epcType: "valid" | "warning" | "action";
  eicrStatus: string;
  eicrType: "valid" | "warning" | "action";
  depositStatus: string;
  actionLabel: string;
}

/* ==========================================
   2. PROPERTIES DATA & BUILDERS
   ========================================== */

const createProperty = (
  id: string,
  code: string,
  title: string,
  address: string,
  type: PropertyRecord["type"],
  subType: string,
  occupant: string,
  rent: string,
  complianceStatus: PropertyRecord["complianceStatus"],
  complianceText: string,
  isVacant = false
): PropertyRecord => ({
  id,
  code,
  title,
  address,
  type,
  subType,
  occupant,
  tenancyInfo: isVacant ? "Available now" : "AST • Active",
  rent,
  rentType: isVacant ? "Target Rent" : "Monthly",
  ledgerStatus: isVacant ? "vacant" : "paid_dd",
  ledgerText: isVacant ? "— Vacant —" : "Paid (Direct Debit)",
  complianceStatus,
  complianceText,
  isVacant,
});

export const propertiesData: PropertyRecord[] = [
  createProperty("1", "CM-08", "8 Camden Mews", "Camden, London NW1 9UX", "Residential", "2 Bed Flat", "Elena Rostova", "£850.00", "warning", "Gas CP12 due in 5d"),
  createProperty("2", "BC-27", "27 Blenheim Crescent", "Notting Hill, London W11 2EF", "Residential", "4 Bed Townhouse", "Marcus Vance", "£2,600.00", "valid", "Valid • 2027 (4/4)"),
  createProperty("3", "SJ-03A", "Unit 3A, St. John's Court", "Clapham, London SW4 7JR", "Residential", "1 Bed Apartment", "Maya Lin & S. Patel", "£1,850.00", "valid", "Valid • 2026 (4/4)"),
  createProperty("4", "KG-4B", "Flat 4B, 18 Kensington Gdns", "Kensington, London W2 4QH", "Residential", "3 Bed Penthouse", "Oliver & Clara Finch", "£2,450.00", "warning", "Boiler SLA Pending"),
  createProperty("5", "RM-12", "12 Richmond Hill Mansions", "Richmond, Surrey TW10 6RF", "Residential", "2 Bed Apartment", "Dr. Aris Thorne", "£3,100.00", "valid", "Valid • 2026 (4/4)"),
  createProperty("6", "EW-14", "14 Elmfield Way", "Maida Vale, London W9 3BB", "Residential", "Victorian Terrace", "Vacant • Refurbishment", "£2,900.00", "action", "EPC Rating E Expiring", true),
  createProperty("7", "GV-07", "7 Grosvenor Vale", "Ruislip, London HA4 6QY", "Commercial", "Ground Floor Office", "Apex Logistics Ltd", "£3,400.00", "valid", "Valid • 2028 (5/5)"),
];

/* ==========================================
   3. TENANTS DATA & LOOKUP STORE
   ========================================== */

export const tenantsData: TenantRecord[] = [
  { id: "1", initials: "OD", names: "Oliver Davies & Clara Finch", contact: "oliver.davies@kensington-tenants.co.uk • +44 7911 123456", property: "Flat 4B, 18 Kensington Gdns", unit: "London W2 4QH (Penthouse)", startDate: "01 Oct 2024", endDate: "30 Sep 2026", termType: "AST • 24 Months", rent: "£2,450.00", paymentMethod: "Direct Debit", ledgerStatus: "Paid", ledgerBadgeStyle: "bg-[#EAF4ED] text-[#1E5E2F]", inviteStatus: "Active (Verified AST)" },
  { id: "2", initials: "ER", names: "Elena Rostova", contact: "e.rostova@canton-arts.org • +44 7700 900231", property: "8 Camden Mews", unit: "London NW1 9UX (2 Bed Flat)", startDate: "15 Jun 2024", endDate: "14 Jun 2026", termType: "AST • 24 Months", rent: "£850.00", paymentMethod: "Standing Order", ledgerStatus: "Overdue (14 days)", ledgerBadgeStyle: "bg-rose-50 text-rose-800 border border-rose-200", inviteStatus: "Verified AST" },
  { id: "3", initials: "MV", names: "Marcus Vance", contact: "m.vance@vanceholdings.co.uk • +44 7900 445566", property: "27 Blenheim Crescent", unit: "Notting Hill, W11 2EF (4 Bed)", startDate: "01 Oct 2023", endDate: "30 Sep 2026", termType: "AST • 36 Months", rent: "£2,600.00", paymentMethod: "Standing Order", ledgerStatus: "Overdue (7 days)", ledgerBadgeStyle: "bg-rose-50 text-rose-800 border border-rose-200", inviteStatus: "Verified AST" },
  { id: "4", initials: "ML", names: "Maya Lin & S. Patel", contact: "maya.lin@studio-arch.co.uk • +44 7822 199342", property: "Unit 3A, St. John's Court", unit: "Clapham, SW4 7JR", startDate: "15 Jan 2024", endDate: "14 Jan 2027", termType: "AST • 36 Months", rent: "£1,850.00", paymentMethod: "Direct Debit", ledgerStatus: "Due in 3 days", ledgerBadgeStyle: "bg-amber-50 text-amber-800 border border-amber-200", inviteStatus: "Verified AST" },
];

export const tenantDataStore: Record<string, TenantDetail> = Object.fromEntries(
  tenantsData.map((tenant) => [
    tenant.id,
    {
      ...tenant,
      authId: `#UK-TN-${tenant.id}109`,
      email: tenant.contact.split(" • ")[0],
      phone: tenant.contact.split(" • ")[1] ?? "",
      commencedDate: tenant.startDate,
      rentAmount: tenant.rent,
      arrears: "£0.00",
      nextDue: "01 Nov 2026",
      fixedTerm: `${tenant.startDate} – ${tenant.endDate}`,
      remainingMonths: "12m remaining",
      depositAmount: "£2,450.00",
      depositScheme: "DPS Custodial",
      oversightAgent: "Haven Lettings Team",
      agencyName: "Haven Property Partners",
      vettingTier: "Tier 1 Pass",
      emergencyContact: "Available on file",
    },
  ])
) as Record<string, TenantDetail>;

/* ==========================================
   4. MAINTENANCE & COMPLIANCE DATA
   ========================================== */

export const maintenanceTickets: MaintenanceTicket[] = [
  { id: "1", code: "MN-104", issue: "Boiler pressure drop & no hot water", loggedDate: "Today 06:45", property: "Flat 4B, 18 Kensington Gdns", address: "Kensington, W2 4QH", tenant: "Oliver Finch", tenancyStatus: "AST • Active", priority: "Urgent", status: "In Progress", contractor: "Pimlico Plumbers", contractorSub: "Emergency Response", category: "Heating" },
  { id: "2", code: "MN-103", issue: "Intercom buzzer not connecting to handset", loggedDate: "Yesterday 14:20", property: "Unit 3A, St. John's Ct", address: "Clapham, SW4", tenant: "Maya Lin", tenancyStatus: "AST • Active", priority: "Routine", status: "Submitted", contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Electrical" },
  { id: "3", code: "MN-102", issue: "Damp inspection on ground floor bedroom bay", loggedDate: "10 Sep 2026", property: "7 Grosvenor Vale", address: "Ruislip, HA4", tenant: "Hannah Ward", tenancyStatus: "AST • Active", priority: "High", status: "In Progress", contractor: "Aspect Property Surveyors", contractorSub: "Survey booked", category: "Structural" },
];

export const complianceCertificates: ComplianceItem[] = [
  {
    id: "1",
    property: "Flat 4B, 18 Kensington Gdns",
    address: "Kensington, W2 4QH • AST Active",
    gasStatus: "Expiring in 6d",
    gasType: "warning",
    epcStatus: "Rating C • Exp 2031",
    epcType: "valid",
    eicrStatus: "Satisfactory • Exp 2028",
    eicrType: "valid",
    depositStatus: "Protected (DPS)",
    actionLabel: "Book Gas Safe",
  },
  {
    id: "2",
    property: "7 Grosvenor Vale",
    address: "Ruislip, HA4 • AST Active",
    gasStatus: "Valid • Exp 2027",
    gasType: "valid",
    epcStatus: "Rating F (Expired)",
    epcType: "action",
    eicrStatus: "Satisfactory • Exp 2027",
    eicrType: "valid",
    depositStatus: "Protected (TDS)",
    actionLabel: "Order EPC",
  },
  {
    id: "3",
    property: "8 Camden Mews",
    address: "Camden, NW1 9UX • AST Active",
    gasStatus: "Expiring in 5d",
    gasType: "warning",
    epcStatus: "Rating D • Exp 2029",
    epcType: "valid",
    eicrStatus: "Satisfactory • Exp 2027",
    eicrType: "valid",
    depositStatus: "Protected (DPS)",
    actionLabel: "Book Gas Safe",
  },
  {
    id: "4",
    property: "27 Blenheim Crescent",
    address: "Notting Hill, W11 2EF • AST Active",
    gasStatus: "Valid • Exp Jan 2027",
    gasType: "valid",
    epcStatus: "Rating B • Exp 2032",
    epcType: "valid",
    eicrStatus: "Expiring in 18d",
    eicrType: "warning",
    depositStatus: "Protected (MyDeposits)",
    actionLabel: "Schedule EICR",
  },
  {
    id: "5",
    property: "12 Richmond Hill Mansions",
    address: "Richmond, TW10 6RF • AST Active",
    gasStatus: "Valid • Exp 2027",
    gasType: "valid",
    epcStatus: "Rating A (Pass)",
    epcType: "valid",
    eicrStatus: "Satisfactory • Exp 2027",
    eicrType: "valid",
    depositStatus: "Protected (TDS)",
    actionLabel: "View Details",
  },
];

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
  return agentDataStore[id] || agentDataStore["1"];
}
  /* ========================================== 
// 6. COMPLIANCE DATA & LOOKUP STORE
   ========================================== */
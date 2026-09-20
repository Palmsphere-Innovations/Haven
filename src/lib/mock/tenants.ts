export interface TenantRecord {
  id: string;
  propertyId: string | null; // links to PropertyRecord.id in properties.ts
  initials: string;
  names: string;
  jointWith?: string;
  contact: string;
  property: string; // display text — kept for existing UI, propertyId is the real link
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

export const tenantsData: TenantRecord[] = [
  {
    id: "1",
    propertyId: "4", // KG-4B
    initials: "OD",
    names: "Oliver Davies & Clara Finch",
    contact: "oliver.davies@kensington-tenants.co.uk • +44 7911 123456",
    property: "Flat 4B, 18 Kensington Gdns",
    unit: "London W2 4QH (Penthouse)",
    startDate: "01 Oct 2024",
    endDate: "30 Sep 2026",
    termType: "AST • 24 Months",
    rent: "£2,450.00",
    paymentMethod: "Direct Debit",
    ledgerStatus: "Paid",
    ledgerBadgeStyle: "bg-[#EAF4ED] text-[#1E5E2F]",
    inviteStatus: "Active (Verified AST)",
  },
  {
    id: "2",
    propertyId: "1", // CM-08
    initials: "ER",
    names: "Elena Rostova",
    contact: "e.rostova@canton-arts.org • +44 7700 900231",
    property: "8 Camden Mews",
    unit: "London NW1 9UX (2 Bed Flat)",
    startDate: "15 Jun 2024",
    endDate: "14 Jun 2026",
    termType: "AST • 24 Months",
    rent: "£850.00",
    paymentMethod: "Standing Order",
    ledgerStatus: "Overdue (14 days)",
    ledgerBadgeStyle: "bg-rose-50 text-rose-800 border border-rose-200",
    inviteStatus: "Verified AST",
  },
  {
    id: "3",
    propertyId: "2", // BC-27
    initials: "MV",
    names: "Marcus Vance",
    contact: "m.vance@vanceholdings.co.uk • +44 7900 445566",
    property: "27 Blenheim Crescent",
    unit: "Notting Hill, W11 2EF (4 Bed)",
    startDate: "01 Oct 2023",
    endDate: "30 Sep 2026",
    termType: "AST • 36 Months",
    rent: "£2,600.00",
    paymentMethod: "Standing Order",
    ledgerStatus: "Overdue (7 days)",
    ledgerBadgeStyle: "bg-rose-50 text-rose-800 border border-rose-200",
    inviteStatus: "Verified AST",
  },
  {
    id: "4",
    propertyId: "3", // SJ-03A
    initials: "ML",
    names: "Maya Lin & S. Patel",
    contact: "maya.lin@studio-arch.co.uk • +44 7822 199342",
    property: "Unit 3A, St. John's Court",
    unit: "Clapham, SW4 7JR",
    startDate: "15 Jan 2024",
    endDate: "14 Jan 2027",
    termType: "AST • 36 Months",
    rent: "£1,850.00",
    paymentMethod: "Direct Debit",
    ledgerStatus: "Due in 3 days",
    ledgerBadgeStyle: "bg-amber-50 text-amber-800 border border-amber-200",
    inviteStatus: "Verified AST",
  },
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

export function getTenantById(id: string): TenantRecord | undefined {
  return tenantsData.find((t) => t.id === id);
}


export type TenancyStageFilter = "all" | "active" | "application" | "invited" | "former"

// export interface TenantRecord {
//   id: string
//   name: string
//   initials: string
//   email: string
//   isApplicant?: boolean
//   propertyTitle: string
//   landlord: string
//   mandateTier: "Tier 1: Full Management" | "Tier 2: Maint + Comms" | "Tier 3: Maintenance Only"
//   tenancyDates: string
//   rentStatus: string
//   rentStatusType: "success" | "warning" | "neutral" | "redacted"
//   stageLabel: string
//   stageType: "active" | "screening" | "signature"
//   isFinancialRestricted?: boolean
// }
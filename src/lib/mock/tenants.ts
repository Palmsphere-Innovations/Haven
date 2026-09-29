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
  {
    id: "5",
    propertyId: "5", // RM-12
    initials: "AT",
    names: "Dr. Aris Thorne",
    contact: "aris.thorne@nhs.net • +44 7711 889900",
    property: "12 Richmond Hill Mansions",
    unit: "Richmond, TW10 6RF",
    startDate: "01 Feb 2024",
    endDate: "31 Jan 2027",
    termType: "AST • 36 Months",
    rent: "£3,100.00",
    paymentMethod: "Standing Order",
    ledgerStatus: "Paid",
    ledgerBadgeStyle: "bg-[#EAF4ED] text-[#1E5E2F]",
    inviteStatus: "Verified AST",
  },
  {
    id: "6",
    propertyId: "7", // CS-05
    initials: "JT",
    names: "Julian Thorne & Alex Mercer",
    contact: "julian.thorne@mercer-partners.com • +44 7899 112233",
    property: "5 Charlotte Street",
    unit: "Fitzrovia, W1T 1RE",
    startDate: "01 Nov 2023",
    endDate: "31 Oct 2026",
    termType: "AST • 36 Months",
    rent: "£1,950.00",
    paymentMethod: "Direct Debit",
    ledgerStatus: "Paid",
    ledgerBadgeStyle: "bg-[#EAF4ED] text-[#1E5E2F]",
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


export type TenancyStageFilter = "all" | "active" | "application" | "invited" | "former";

export interface RentPaymentRecord {
  id: string;
  period: string;
  status: "Paid on Time" | "Pending" | "Overdue";
  date: string;
  directDebitRef: string;
  amount: string;
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  category: string;
  status: "Logged" | "Under Review" | "Visit Scheduled" | "In Progress" | "Completed";
  loggedDate: string;
  contractor: string;
  appointmentWindow?: string;
  resolutionDate?: string;
  reference: string;
  priority?: "Routine" | "Urgent" | "Emergency";
  description?: string;
  accessNotes?: string;
  photos?: string[];
}

export interface TenancyDocument {
  id: string;
  title: string;
  metadata: string;
  type: "ast" | "deposit" | "inventory" | "gas" | "epc" | "eicr" | "other";
  fileSize?: string;
  dateAdded?: string;
  status?: string;
  referenceNumber?: string;
}

export const INITIAL_TENANT_TICKETS: MaintenanceTicket[] = [
  {
    id: "tkt-1",
    reference: "#TKT-4921",
    title: "En-suite Radiator Not Heating Evenly",
    category: "Heating & Radiators",
    priority: "Urgent",
    status: "Visit Scheduled",
    loggedDate: "12 Oct 2024",
    contractor: "Apex Heating (Gas Safe #48291)",
    appointmentWindow: "Thu 17 Oct, 10:00 - 12:00 BST",
    description: "Radiator in the master en-suite bathroom remains stone cold while hallway radiators are hot. Appears to be an airlock or faulty TRV valve.",
    accessNotes: "Concierge at 18 Kensington Gardens has spare management key if tenant is unavailable.",
    photos: ["/images/maintenance-radiator.jpg"]
  },
  {
    id: "tkt-2",
    reference: "#TKT-3108",
    title: "Intercom Handset Replacement",
    category: "Security & Access",
    priority: "Routine",
    status: "Completed",
    loggedDate: "14 Aug 2024",
    contractor: "Kensington SecureComms Ltd",
    resolutionDate: "16 Aug 2024",
    description: "Video display panel on entry phone was flickering and audio crackling on buzzer call from gatehouse.",
    accessNotes: "Tenant was present on site."
  },
  {
    id: "tkt-3",
    reference: "#TKT-2490",
    title: "Kitchen Induction Hob Lockout Diagnostic",
    category: "Appliances",
    priority: "Routine",
    status: "Completed",
    loggedDate: "02 May 2024",
    contractor: "Miele Authorized Service London",
    resolutionDate: "04 May 2024",
    description: "Child safety lock activated automatically and reset sensor error displayed code E-31.",
    accessNotes: "Service technician attended during business hours."
  }
];

export const INITIAL_TENANCY_DOCS: TenancyDocument[] = [
  {
    id: "doc-1",
    title: "Tenancy Agreement (AST)",
    metadata: "Signed 28 Nov 2023 • Executed",
    type: "ast",
    fileSize: "3.2 MB",
    dateAdded: "28 Nov 2023",
    status: "Countersigned & Active",
    referenceNumber: "#AST-2023-4B"
  },
  {
    id: "doc-2",
    title: "DPS Deposit Certificate",
    metadata: "£2,826.92 • Custodial Protection",
    type: "deposit",
    fileSize: "680 KB",
    dateAdded: "01 Dec 2023",
    status: "DPS Verified",
    referenceNumber: "#DPS-481928"
  },
  {
    id: "doc-3",
    title: "Check-in Inventory Report",
    metadata: "142 Timestamped Photos • Condition Dossier",
    type: "inventory",
    fileSize: "14.8 MB",
    dateAdded: "30 Nov 2023",
    status: "Countersigned",
    referenceNumber: "#INV-W2-4B"
  },
  {
    id: "doc-4",
    title: "Gas Safety Certificate (CP12)",
    metadata: "Valid until Oct 2025 • Apex Heating",
    type: "gas",
    fileSize: "410 KB",
    dateAdded: "15 Oct 2024",
    status: "Compliant & Valid",
    referenceNumber: "#CP12-884920"
  },
  {
    id: "doc-5",
    title: "Energy Performance Certificate (EPC)",
    metadata: "Rating: Grade C (74) • Exp: Mar 2031",
    type: "epc",
    fileSize: "890 KB",
    dateAdded: "12 Mar 2021",
    status: "Certified",
    referenceNumber: "#EPC-8819-2031"
  }
];
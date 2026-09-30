export interface ComplianceItem {
  id: string;
  propertyId: string | null; // links to PropertyRecord.id in properties.ts
  property: string; // display text — kept for existing UI, propertyId is the real link
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

export const complianceCertificates: ComplianceItem[] = [
  {
    id: "1",
    propertyId: "4", // KG-4B
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
    propertyId: "7", // GV-07
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
    propertyId: "1", // CM-08
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
    propertyId: "2", // BC-27
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
    propertyId: "5", // RM-12
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

export function getComplianceForProperty(propertyId: string): ComplianceItem | undefined {
  return complianceCertificates.find((c) => c.propertyId === propertyId);
}


export type ComplianceStatusFilter = "ALL" | "VALID" | "EXPIRING" | "URGENT"

export interface ComplianceProperty {
  id: string
  address: string
  postcode: string
  landlord: string
  mandateTier: "Tier 1: Full Mgt" | "Tier 2: Maint & Comms"
  gasSafety: {
    status: "VALID" | "EXPIRING" | "EXPIRED"
    expiryDate: string
    certNumber: string
    daysRemaining?: number
  }
  epc: {
    status: "VALID" | "EXPIRING" | "EXPIRED"
    rating: string
    expiryDate: string
    type: string
  }
  eicr: {
    status: "VALID" | "EXPIRING" | "EXPIRED"
    expiryDate: string
    certBody: string
    daysRemaining?: number
  }
  deposit: {
    scheme: string
    id: string
    protectedAmount?: string
    isRestricted?: boolean
  }
}
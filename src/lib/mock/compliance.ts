
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

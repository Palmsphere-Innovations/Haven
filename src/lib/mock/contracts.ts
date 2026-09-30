export interface ContractRecord {
  id: string;
  property: string;
  postcode: string;
  tenants: string;
  tenancyType: string;
  instrument: string;
  termWindow: string;
  duration: string;
  status: "active" | "expiring" | "awaiting" | "draft";
  statusText: string;
  rentAmount: string;
  depositAmount: string;
  reference: string;
}

export const initialContracts: ContractRecord[] = [
  {
    id: "1",
    property: "Flat 4B, 18 Kensington Gardens",
    postcode: "London, W2 4QH",
    tenants: "Oliver Davies & Clara Finch",
    tenancyType: "Joint & Several",
    instrument: "AST (Joint Fixed)",
    termWindow: "01 Oct 2024 – 30 Sep 2026",
    duration: "24m",
    status: "active",
    statusText: "Signed (Active)",
    rentAmount: "£2,450.00",
    depositAmount: "£2,826.92",
    reference: "AST-2024-KENS-4B",
  },
  {
    id: "2",
    property: "8 Camden Mews",
    postcode: "London, NW1 9UX",
    tenants: "Elena Rostova",
    tenancyType: "Sole Tenant",
    instrument: "AST (Standard Fixed)",
    termWindow: "15 Jun 2024 – 14 Jun 2026",
    duration: "24m",
    status: "active",
    statusText: "Signed (Active)",
    rentAmount: "£1,880.00",
    depositAmount: "£2,169.23",
    reference: "AST-2024-CMD-08",
  },
  {
    id: "3",
    property: "Unit 3A, St. John's Court",
    postcode: "London, SW4 7JT",
    tenants: "Maya Lin & S. Patel",
    tenancyType: "Joint & Several",
    instrument: "AST (Joint Fixed)",
    termWindow: "15 Jan 2024 – 14 Jan 2027",
    duration: "36m",
    status: "expiring",
    statusText: "Expiring Soon (52d)",
    rentAmount: "£1,650.00",
    depositAmount: "£1,903.85",
    reference: "AST-2024-SJC-03",
  },
  {
    id: "4",
    property: "12 Richmond Hill Mansions",
    postcode: "Richmond, TW10 6RF",
    tenants: "Dr. Aris Thorne",
    tenancyType: "Individual Lease",
    instrument: "Non-Housing Act (>£100k)",
    termWindow: "01 Nov 2024 – 31 Oct 2026",
    duration: "24m",
    status: "awaiting",
    statusText: "Awaiting Signature",
    rentAmount: "£3,200.00",
    depositAmount: "£3,692.30",
    reference: "NHA-2024-RHM-12",
  },
  {
    id: "5",
    property: "27 Blenheim Crescent",
    postcode: "Notting Hill, W11 2EF",
    tenants: "Marcus Vance (Family Trust)",
    tenancyType: "Statutory Periodic",
    instrument: "AST (Statutory Periodic)",
    termWindow: "01 Oct 2023 – Continuous",
    duration: "Periodic",
    status: "active",
    statusText: "Signed (Active)",
    rentAmount: "£2,100.00",
    depositAmount: "£2,423.07",
    reference: "AST-2023-BHC-27",
  },
  {
    id: "6",
    property: "Flat 2, 8 Camden Mews",
    postcode: "London, NW1 9UX",
    tenants: "Sophie Montgomery",
    tenancyType: "Applicant (Screened)",
    instrument: "Standard AST (12m Fixed)",
    termWindow: "01 Nov 2025 – 31 Oct 2026",
    duration: "12m",
    status: "draft",
    statusText: "Draft (Review)",
    rentAmount: "£1,750.00",
    depositAmount: "£2,019.23",
    reference: "AST-2025-CMD-02",
  },
];

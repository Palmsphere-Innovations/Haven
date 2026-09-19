/**
 * Properties — single source of truth.
 *
 * This merges what used to be two separate, disconnected property lists
 * (`legacyProperties` keyed by code, and `propertiesData` as an array).
 * Every property now carries BOTH the detail fields (bedrooms, valuation,
 * certificates) and the list/ledger fields (rent, complianceStatus) in one
 * record, plus a stable `id` that other files (tenants, maintenance,
 * compliance) link back to.
 */

export interface Certificate {
  name: string;
  status: string;
  valid: boolean;
}

export interface PropertyRecord {
  id: string;
  code: string;
  title: string;
  address: string;
  type: "Residential" | "Commercial";
  subType: string;

  // Detail fields (from the old legacyProperties)
  bedrooms: number;
  bathrooms: number;
  epcRating: string;
  area: string;
  valuation: string;
  certificates: Certificate[];

  // Occupancy — occupant is the display string (kept for existing UI),
  // tenantId is the real link into tenants.ts (null if no tenant record exists)
  occupant: string;
  tenantId: string | null;
  tenancyInfo: string;

  // Ledger / rent
  rent: string;
  rentType: string;
  ledgerStatus:
    | "overdue_14"
    | "overdue_7"
    | "due_soon"
    | "paid_dd"
    | "paid_so"
    | "paid_bacs"
    | "vacant";
  ledgerText: string;

  // Compliance summary (quick-glance; full detail lives in compliance.ts,
  // linked via propertyId)
  complianceStatus: "warning" | "valid" | "action";
  complianceText: string;

  isVacant: boolean;
}

function createProperty(fields: {
  id: string;
  code: string;
  title: string;
  address: string;
  type: PropertyRecord["type"];
  subType: string;
  bedrooms: number;
  bathrooms: number;
  epcRating: string;
  area: string;
  valuation: string;
  certificates: Certificate[];
  occupant: string;
  tenantId: string | null;
  rent: string;
  complianceStatus: PropertyRecord["complianceStatus"];
  complianceText: string;
  isVacant?: boolean;
}): PropertyRecord {
  const isVacant = fields.isVacant ?? false;
  return {
    ...fields,
    tenancyInfo: isVacant ? "Available now" : "AST • Active",
    rentType: isVacant ? "Target Rent" : "Monthly",
    ledgerStatus: isVacant ? "vacant" : "paid_dd",
    ledgerText: isVacant ? "— Vacant —" : "Paid (Direct Debit)",
    isVacant,
  };
}

export const propertiesData: PropertyRecord[] = [
  createProperty({
    id: "1",
    code: "CM-08",
    title: "8 Camden Mews",
    address: "Camden, London NW1 9UX",
    type: "Residential",
    subType: "2 Bed Flat",
    bedrooms: 2,
    bathrooms: 1,
    epcRating: "C (72)",
    area: "846 sq ft",
    valuation: "£465,000.00",
    certificates: [
      { name: "Gas Safety Certificate (CP12)", status: "Expires in 5 days", valid: false },
      { name: "Electrical Inspection (EICR)", status: "Valid until 2028", valid: true },
      { name: "Energy Certificate (EPC)", status: "Valid until 2031", valid: true },
      { name: "Smoke & CO Alarms Log", status: "Checked Jan 2026", valid: true },
    ],
    occupant: "Elena Rostova",
    tenantId: "2", // Elena Rostova — tenants.ts
    rent: "£850.00",
    complianceStatus: "warning",
    complianceText: "Gas CP12 due in 5d",
  }),
  createProperty({
    id: "2",
    code: "BC-27",
    title: "27 Blenheim Crescent",
    address: "Notting Hill, London W11 2EF",
    type: "Residential",
    subType: "4 Bed Townhouse",
    bedrooms: 4,
    bathrooms: 2,
    epcRating: "B (81)",
    area: "1,420 sq ft",
    valuation: "£875,000.00",
    certificates: [
      { name: "Gas Safety Certificate (CP12)", status: "Valid until 2027", valid: true },
      { name: "Electrical Inspection (EICR)", status: "Valid until 2028", valid: true },
    ],
    occupant: "Marcus Vance",
    tenantId: "3", // Marcus Vance — tenants.ts
    rent: "£2,600.00",
    complianceStatus: "valid",
    complianceText: "Valid • 2027 (4/4)",
  }),
  createProperty({
    id: "3",
    code: "SJ-03A",
    title: "Unit 3A, St. John's Court",
    address: "Clapham, London SW4 7JR",
    type: "Residential",
    subType: "1 Bed Apartment",
    bedrooms: 1,
    bathrooms: 1,
    epcRating: "C (72)",
    area: "612 sq ft",
    valuation: "£390,000.00",
    certificates: [
      { name: "Gas Safety Certificate (CP12)", status: "Valid until 2026", valid: true },
      { name: "Electrical Inspection (EICR)", status: "Valid until 2027", valid: true },
    ],
    occupant: "Maya Lin & S. Patel",
    tenantId: "4", // Maya Lin & S. Patel — tenants.ts
    rent: "£1,850.00",
    complianceStatus: "valid",
    complianceText: "Valid • 2026 (4/4)",
  }),
  createProperty({
    id: "4",
    code: "KG-4B",
    title: "Flat 4B, 18 Kensington Gdns",
    address: "Kensington, London W2 4QH",
    type: "Residential",
    subType: "3 Bed Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    epcRating: "D (61)",
    area: "1,180 sq ft",
    valuation: "£1,050,000.00",
    certificates: [
      { name: "Gas Safety Certificate (CP12)", status: "Expires in 12 days", valid: false },
      { name: "Electrical Inspection (EICR)", status: "Valid until 2028", valid: true },
    ],
    occupant: "Oliver & Clara Finch",
    tenantId: "1", // Oliver Davies & Clara Finch — tenants.ts
    rent: "£2,450.00",
    complianceStatus: "warning",
    complianceText: "Boiler SLA Pending",
  }),
  createProperty({
    id: "5",
    code: "RM-12",
    title: "12 Richmond Hill Mansions",
    address: "Richmond, Surrey TW10 6RF",
    type: "Residential",
    subType: "2 Bed Apartment",
    bedrooms: 2,
    bathrooms: 1,
    epcRating: "B (78)",
    area: "920 sq ft",
    valuation: "£625,000.00",
    certificates: [
      { name: "Gas Safety Certificate (CP12)", status: "Valid until 2026", valid: true },
      { name: "Energy Certificate (EPC)", status: "Valid until 2030", valid: true },
    ],
    occupant: "Dr. Aris Thorne",
    tenantId: null, // no matching TenantRecord in tenants.ts yet
    rent: "£3,100.00",
    complianceStatus: "valid",
    complianceText: "Valid • 2026 (4/4)",
  }),
  createProperty({
    id: "6",
    code: "EW-14",
    title: "14 Elmfield Way",
    address: "Maida Vale, London W9 3BB",
    type: "Residential",
    subType: "Victorian Terrace",
    bedrooms: 3,
    bathrooms: 1,
    epcRating: "E (44)",
    area: "1,060 sq ft",
    valuation: "£710,000.00",
    certificates: [
      { name: "Energy Certificate (EPC)", status: "Expires in 18 days", valid: false },
      { name: "Smoke & CO Alarms Log", status: "Checked Jan 2026", valid: true },
    ],
    occupant: "Vacant • Refurbishment",
    tenantId: null,
    rent: "£2,900.00",
    complianceStatus: "action",
    complianceText: "EPC Rating E Expiring",
    isVacant: true,
  }),
  createProperty({
    id: "7",
    code: "GV-07",
    title: "7 Grosvenor Vale",
    address: "Ruislip, London HA4 6QY",
    type: "Commercial",
    subType: "Ground Floor Office",
    bedrooms: 0,
    bathrooms: 2,
    epcRating: "B (84)",
    area: "2,100 sq ft",
    valuation: "£930,000.00",
    certificates: [
      { name: "Electrical Inspection (EICR)", status: "Valid until 2028", valid: true },
      { name: "Energy Certificate (EPC)", status: "Valid until 2029", valid: true },
    ],
    occupant: "Apex Logistics Ltd",
    tenantId: null, // commercial occupant, not a TenantRecord
    rent: "£3,400.00",
    complianceStatus: "valid",
    complianceText: "Valid • 2028 (5/5)",
  }),
];

export function getPropertyById(id: string): PropertyRecord | undefined {
  return propertiesData.find((p) => p.id === id);
}

export function getPropertyByCode(code: string): PropertyRecord | undefined {
  const normalized = code.trim().toUpperCase();
  return propertiesData.find((p) => p.code === normalized);
}

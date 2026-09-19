import { propertiesData } from "./properties";

export type LandlordStatus = "Active" | "Pending Verification" | "Archived";

export interface LandlordRecord {
  id: string;
  name: string;
  legalName: string;
  initials: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  status: LandlordStatus;
  propertyIds: string[];
  agentIds: string[];
  tenantIds: string[];
  portfolioValue: string;
  monthlyRent: string;
  occupancyRate: string;
  complianceRate: string;
  nextReviewDate: string;
  notes: string;
}

export interface LandlordDetail extends LandlordRecord {
  properties: typeof propertiesData;
}

export const landlordsData: LandlordRecord[] = [
  {
    id: "1",
    name: "Vance Holdings Ltd",
    legalName: "Vance Holdings Limited",
    initials: "VH",
    email: "portfolio@vanceholdings.co.uk",
    phone: "+44 20 7946 0188",
    address: "14 Belgrave Square, London SW1X 8PS",
    registrationNumber: "VHL-UK-88421",
    status: "Active",
    propertyIds: ["1", "2", "3", "4", "5", "6", "7"],
    agentIds: ["1", "2", "3", "4", "5"],
    tenantIds: ["1", "2", "3", "4"],
    portfolioValue: "£4,815,000.00",
    monthlyRent: "£12,950.00",
    occupancyRate: "86%",
    complianceRate: "92%",
    nextReviewDate: "15 Nov 2026",
    notes:
      "Primary Haven portfolio for Greater London and Surrey residential assets.",
  },
  {
    id: "2",
    name: "Northbank Estates",
    legalName: "Northbank Estates & Investments LLP",
    initials: "NE",
    email: "estates@northbank.co.uk",
    phone: "+44 20 7123 4490",
    address: "90 Farringdon Road, London EC1M 3LN",
    registrationNumber: "NBE-UK-49317",
    status: "Active",
    propertyIds: ["1", "2"],
    agentIds: ["1", "2"],
    tenantIds: ["2", "3"],
    portfolioValue: "£1,340,000.00",
    monthlyRent: "£3,450.00",
    occupancyRate: "100%",
    complianceRate: "88%",
    nextReviewDate: "02 Dec 2026",
    notes:
      "Small managed portfolio focused on Camden and Notting Hill apartments.",
  },
  {
    id: "3",
    name: "Hawthorn Residential",
    legalName: "Hawthorn Residential Partnership",
    initials: "HR",
    email: "admin@hawthornresidential.co.uk",
    phone: "+44 20 8392 1174",
    address: "22 Church Street, Richmond, Surrey TW9 1JL",
    registrationNumber: "HRP-UK-77105",
    status: "Pending Verification",
    propertyIds: ["5", "6", "7"],
    agentIds: ["3", "4"],
    tenantIds: [],
    portfolioValue: "£1,945,000.00",
    monthlyRent: "£5,200.00",
    occupancyRate: "67%",
    complianceRate: "75%",
    nextReviewDate: "21 Oct 2026",
    notes:
      "New landlord account awaiting final identity and ownership verification.",
  },
];

export const landlordDataStore: Record<string, LandlordDetail> =
  Object.fromEntries(
    landlordsData.map((landlord) => [
      landlord.id,
      {
        ...landlord,
        properties: propertiesData.filter((property) =>
          landlord.propertyIds.includes(property.id),
        ),
      },
    ]),
  ) as Record<string, LandlordDetail>;

export function getLandlordById(id: string): LandlordRecord | undefined {
  return landlordsData.find((landlord) => landlord.id === id);
}

export function getLandlordDetail(id: string): LandlordDetail {
  return landlordDataStore[id] ?? landlordDataStore["1"];
}
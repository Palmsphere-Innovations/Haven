export interface MockProperty {
  code: string;
  title: string;
  address: string;
  vacant: boolean;
  compliance: string;
  bedrooms: number;
  bathrooms: number;
  epcRating: string;
  area: string;
  valuation: string;
  rent: string;
  tenant: string;
  certificates: Array<{ name: string; status: string; valid: boolean }>;
}

export const legacyProperties: Record<string, MockProperty> = {
  "CM-08": { 
    code: "CM-08", 
    title: "8 Camden Mews", 
    address: "Camden, London NW1 9UX", 
    vacant: false, 
    compliance: "Gas CP12 due in 5d", 
    bedrooms: 2, 
    bathrooms: 1, 
    epcRating: "C (72)", 
    area: "846 sq ft", 
    valuation: "£465,000.00", 
    rent: "£850.00", 
    tenant: "Elena Rostova", 
    certificates: [{ 
      name: "Gas Safety Certificate (CP12)", 
      status: "Expires in 5 days",
       valid: false },
       { 
        name: "Electrical Inspection (EICR)", 
        status: "Valid until 2028",
         valid: true }, 
         {
          name: "Energy Certificate (EPC)", 
          status: "Valid until 2031", 
          valid: true }, 
          { 
            name: "Smoke & CO Alarms Log", 
            status: "Checked Jan 2026", 
            valid: true }] },

  "BC-27": {
     code: "BC-27", 
     title: "27 Blenheim Crescent", 
     address: "Notting Hill, London W11 2EF", 
     vacant: false, 
     compliance: "Valid · 2027 (4/4)", 
     bedrooms: 4, 
     bathrooms: 2, 
     epcRating: "B (81)", 
     area: "1,420 sq ft", 
     valuation: "£875,000.00", 
     rent: "£2,600.00", 
     tenant: "Marcus Vance", 
     certificates: [{ 
      name: "Gas Safety Certificate (CP12)", 
      status: "Valid until 2027", 
      valid: true }, { 
        name: "Electrical Inspection (EICR)", 
        status: "Valid until 2028", 
        valid: true }] },
  "SJ-03A": { 
    code: "SJ-03A", 
    title: "Unit 3A, St. John's Court", 
    address: "Clapham, London SW4 7JR", 
    vacant: false, 
    compliance: "Valid · 2026 (4/4)", 
    bedrooms: 1, 
    bathrooms: 1, 
    epcRating: "C (72)", 
    area: "612 sq ft", 
    valuation: "£390,000.00", 
    rent: "£1,850.00", 
    tenant: "Maya Lin & S. Patel", 
    certificates: [{ 
      name: "Gas Safety Certificate (CP12)", 
      status: "Valid until 2026", 
      valid: true }, { 
        name: "Electrical Inspection (EICR)", 
        status: "Valid until 2027", 
        valid: true }] },
  "KG-4B": { 
    code: "KG-4B", 
    title: "Flat 4B, 18 Kensington Gdns", 
    address: "Kensington, London W2 4QH", 
    vacant: false, 
    compliance: "Boiler SLA Pending", 
    bedrooms: 3, 
    bathrooms: 2, 
    epcRating: "D (61)", 
    area: "1,180 sq ft", 
    valuation: "£1,050,000.00", 
    rent: "£2,450.00", 
    tenant: "Oliver & Clara Finch", 
    certificates: [{ 
      name: "Gas Safety Certificate (CP12)", 
      status: "Expires in 12 days", 
      valid: false }, { 
        name: "Electrical Inspection (EICR)", 
        status: "Valid until 2028", 
        valid: true }] },
  "RM-12": { 
    code: "RM-12", 
    title: "12 Richmond Hill Mansions", 
    address: "Richmond, Surrey TW10 6RF", 
    vacant: false, 
    compliance: "Valid · 2026 (4/4)", 
    bedrooms: 2, 
    bathrooms: 1, 
    epcRating: "B (78)", 
    area: "920 sq ft", 
    valuation: "£625,000.00", 
    rent: "£3,100.00", 
    tenant: "Dr. Aris Thorne", 
    certificates: [{ 
      name: "Gas Safety Certificate (CP12)", 
      status: "Valid until 2026", 
      valid: true }, { 
        name: "Energy Certificate (EPC)", 
        status: "Valid until 2030", 
        valid: true }] },
  "EW-14": { 
    code: "EW-14", 
    title: "14 Elmfield Way", 
    address: "Maida Vale, London W9 3BB", 
    vacant: true, 
    compliance: "EPC Rating E Expiring", 
    bedrooms: 3, 
    bathrooms: 1, 
    epcRating: "E (44)", 
    area: "1,060 sq ft", 
    valuation: "£710,000.00", 
    rent: "£2,900.00", 
    tenant: "Vacant", 
    certificates: [{ 
      name: "Energy Certificate (EPC)", 
      status: "Expires in 18 days", 
      valid: false }, { 
        name: "Smoke & CO Alarms Log", 
        status: "Checked Jan 2026", 
        valid: true }] },
  "GV-07": { 
    code: "GV-07", 
    title: "7 Grosvenor Vale", 
    address: "Ruislip, London HA4 6QY", 
    vacant: false, 
    compliance: "Valid · 2028 (5/5)", 
    bedrooms: 0, 
    bathrooms: 2, 
    epcRating: "B (84)", 
    area: "2,100 sq ft", 
    valuation: "£930,000.00", 
    rent: "£3,400.00", 
    tenant: "Apex Logistics Ltd", 
    certificates: [{ 
      name: "Electrical Inspection (EICR)", 
      status: "Valid until 2028", 
      valid: true }, { 
        name: "Energy Certificate (EPC)", 
        status: "Valid until 2029", 
        valid: true }] },
};

export const getMockProperty = (id: string) => {
  const normalizedId = id.trim().toUpperCase();
  return legacyProperties[normalizedId] ?? Object.values(legacyProperties).find((property, index) => String(index + 1) === normalizedId);
};



export interface PropertyRecord {
  id: string;
  code: string;
  title: string;
  address: string;
  type: string;
  subType: string;
  occupant: string;
  tenancyInfo: string;
  rent: string;
  rentType: string;
  ledgerStatus: "overdue_14" | "overdue_7" | "due_soon" | "paid_dd" | "paid_so" | "paid_bacs" | "vacant";
  ledgerText: string;
  complianceStatus: "warning" | "valid" | "action";
  complianceText: string;
  isVacant?: boolean;
}




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


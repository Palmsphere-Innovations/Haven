export interface MaintenanceTicket {
  id: string;
  code: string;
  issue: string;
  loggedDate: string;
  property: string;
  address: string;
  tenant: string;
  tenancyStatus: string;
  priority: "Urgent" | "High" | "Routine";
  status: "In Progress" | "Submitted" | "Resolved";
  contractor: string;
  contractorSub: string;
  isUnassigned?: boolean;
  category?: string;
}



export const legacyInitialTickets: MaintenanceTicket[] = [
  {
    id: "1",
    code: "MN-104",
    issue: "Boiler pressure drop & no hot water",
    loggedDate: "Today 06:45",
    property: "Flat 4B, 18 Kensington Gdns",
    address: "Kensington, W2 4QH",
    tenant: "Oliver Finch",
    tenancyStatus: "AST • Active",
    priority: "Urgent",
    status: "In Progress",
    contractor: "Pimlico Plumbers",
    contractorSub: "Emergency Response",
  },
  {
    id: "2",
    code: "MN-103",
    issue: "Intercom buzzer not connecting to handset",
    loggedDate: "Yesterday 14:20",
    property: "Unit 3A, St. John's Ct",
    address: "Clapham, SW4",
    tenant: "Maya Lin",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Submitted",
    contractor: "Unassigned",
    contractorSub: "",
    isUnassigned: true,
  },
  {
    id: "3",
    code: "MN-102",
    issue: "Damp inspection on ground floor bedroom bay",
    loggedDate: "10 Oct 2025",
    property: "7 Grosvenor Vale",
    address: "Ruislip, HA4",
    tenant: "Hannah Ward",
    tenancyStatus: "AST • Active",
    priority: "High",
    status: "In Progress",
    contractor: "Aspect Property Surveyors",
    contractorSub: "Surveyor: 16 Oct 2025",
  },
  {
    id: "4",
    code: "MN-101",
    issue: "Leaking waste pipe under kitchen sink",
    loggedDate: "09 Oct 2025",
    property: "8 Camden Mews",
    address: "Camden, NW1",
    tenant: "Elena Rostova",
    tenancyStatus: "AST • Active",
    priority: "High",
    status: "Submitted",
    contractor: "Pimlico Plumbers",
    contractorSub: "Quote Pending",
  },
  {
    id: "5",
    code: "MN-100",
    issue: "Periodic EICR remedial rectifications",
    loggedDate: "08 Oct 2025",
    property: "27 Blenheim Cres",
    address: "Notting Hill, W11",
    tenant: "Marcus Vance",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "In Progress",
    contractor: "Apex Electrical",
    contractorSub: "NICEIC Certified",
  },
  {
    id: "6",
    code: "MN-098",
    issue: "Bathroom extractor fan replacement",
    loggedDate: "04 Oct 2025",
    property: "15 Highbury Terrace",
    address: "Islington, N5",
    tenant: "Gareth Evans",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Resolved",
    contractor: "Apex Electrical",
    contractorSub: "Invoice #AE-4091",
  },
  {
    id: "7",
    code: "MN-096",
    issue: "Broken sash window cord in lounge",
    loggedDate: "02 Oct 2025",
    property: "12 Richmond Hill Mansions",
    address: "Richmond, TW10",
    tenant: "Dr. Aris Thorne",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Resolved",
    contractor: "London Joinery Co",
    contractorSub: "Sign-off Complete",
  },
  {
    id: "8", code: "MN-095", issue: "Radiator valve replacement", loggedDate: "01 Oct 2025",
    property: "14 Elmfield Way", address: "Maida Vale, W9", tenant: "Vacant",
    tenancyStatus: "Available", priority: "Routine", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Heating",
  },
  {
    id: "9", code: "MN-094", issue: "Loose bathroom light fitting", loggedDate: "30 Sep 2025",
    property: "22 Chelsea Reach", address: "Chelsea, SW3", tenant: "Priya Shah",
    tenancyStatus: "AST • Active", priority: "High", status: "In Progress",
    contractor: "Apex Electrical", contractorSub: "NICEIC Certified", category: "Electrical",
  },
  {
    id: "10", code: "MN-093", issue: "Kitchen cupboard hinge repair", loggedDate: "28 Sep 2025",
    property: "5 Wandsworth Park", address: "Wandsworth, SW18", tenant: "Tom Ellis",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Resolved",
    contractor: "London Joinery Co", contractorSub: "Invoice #LJ-204", category: "Structural",
  },
  {
    id: "11", code: "MN-092", issue: "Washing machine drainage fault", loggedDate: "25 Sep 2025",
    property: "9 Islington Square", address: "Islington, N1", tenant: "Amira Khan",
    tenancyStatus: "AST • Active", priority: "High", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Appliance",
  },
  {
    id: "12", code: "MN-091", issue: "Blocked external drain", loggedDate: "22 Sep 2025",
    property: "31 Hampstead Lane", address: "Hampstead, NW3", tenant: "James Carter",
    tenancyStatus: "AST • Active", priority: "Urgent", status: "Resolved",
    contractor: "Pimlico Plumbers", contractorSub: "Completed same day", category: "Plumbing",
  },
  {
    id: "13", code: "MN-090", issue: "Cracked bedroom window pane", loggedDate: "20 Sep 2025",
    property: "3 Richmond Terrace", address: "Richmond, TW10", tenant: "Sofia Marin",
    tenancyStatus: "AST • Active", priority: "High", status: "In Progress",
    contractor: "London Glazing", contractorSub: "Survey booked", category: "Structural",
  },
  {
    id: "14", code: "MN-089", issue: "Thermostat not responding", loggedDate: "18 Sep 2025",
    property: "44 Fulham Road", address: "Fulham, SW6", tenant: "Noah Williams",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Resolved",
    contractor: "Heatwise London", contractorSub: "Job signed off", category: "Heating",
  },
  {
    id: "15", code: "MN-088", issue: "Faulty extractor switch", loggedDate: "15 Sep 2025",
    property: "6 Brixton Hill", address: "Brixton, SW2", tenant: "Lucy Green",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Electrical",
  },
];

export const maintenanceTickets: MaintenanceTicket[] = [
  { 
    id: "1", 
    code: "MN-104", 
    issue: "Boiler pressure drop & no hot water", 
    loggedDate: "Today 06:45", 
    property: "Flat 4B, 18 Kensington Gdns", 
    address: "Kensington, W2 4QH", 
    tenant: "Oliver Finch", 
    tenancyStatus: "AST • Active", 
    priority: "Urgent", 
    status: "In Progress", 
    contractor: "Pimlico Plumbers", 
    contractorSub: "Emergency Response", 
    category: "Heating" 
  },
  { 
    id: "2", 
    code: "MN-103", 
    issue: "Intercom buzzer not connecting to handset", 
    loggedDate: "Yesterday 14:20", 
    property: "Unit 3A, St. John's Ct", 
    address: "Clapham, SW4", 
    tenant: "Maya Lin", 
    tenancyStatus: "AST • Active", 
    priority: "Routine", 
    status: "Submitted", 
    contractor: "Unassigned", 
    contractorSub: "", 
    isUnassigned: true, 
    category: "Electrical" },
  { 
    id: "3", 
    code: "MN-102", 
    issue: "Damp inspection on ground floor bedroom bay", 
    loggedDate: "10 Sep 2026", 
    property: "7 Grosvenor Vale", 
    address: "Ruislip, HA4", 
    tenant: "Hannah Ward", 
    tenancyStatus: "AST • Active", 
    priority: "High", 
    status: "In Progress", 
    contractor: "Aspect Property Surveyors", 
    contractorSub: "Survey booked", 
    category: "Structural" },
];

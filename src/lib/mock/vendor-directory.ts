export interface DirectoryListing {
  id: string;
  companyName: string;
  tradingName?: string;
  companyNumber: string;
  vatNumber?: string;
  primaryTrade: string;
  secondaryTrades: string[];
  accreditationBody: string;
  accreditationNumber: string;
  publicLiabilityCover: string;
  publicLiabilityInsurer: string;
  insuranceExpiry: string;
  registeredAddress: string;
  postcode: string;
  coverageRadius: string;
  contactName: string;
  contactEmailMasked: string;
  contactPhoneMasked: string;
  claimed: boolean;
  rating: number;
  completedJobs: number;
}

export const directoryListings: DirectoryListing[] = [
  {
    id: "ven-dir-01",
    companyName: "Pimlico Emergency Gas & Plumbing Ltd",
    tradingName: "Pimlico Emergency Plumbers",
    companyNumber: "08472911",
    vatNumber: "GB 894 1209 44",
    primaryTrade: "Gas & Heating",
    secondaryTrades: ["Plumbing", "Boiler Diagnostics", "Power Flushing"],
    accreditationBody: "Gas Safe Register",
    accreditationNumber: "502188",
    publicLiabilityCover: "£5,000,000",
    publicLiabilityInsurer: "Aviva Commercial",
    insuranceExpiry: "14 Nov 2026",
    registeredAddress: "Unit 4, Vauxhall Bridge Industrial Estate",
    postcode: "SW8 1TT",
    coverageRadius: "Greater London (Zones 1-4)",
    contactName: "Marcus Sterling",
    contactEmailMasked: "m.st***@pimlicoplumb.co.uk",
    contactPhoneMasked: "+44 20 7924 ••••",
    claimed: false,
    rating: 4.9,
    completedJobs: 142,
  },
  {
    id: "ven-dir-02",
    companyName: "Apex Electrical & Fire Solutions Ltd",
    tradingName: "Apex Power & Fire",
    companyNumber: "09124483",
    vatNumber: "GB 912 3311 02",
    primaryTrade: "Electrical",
    secondaryTrades: ["Fire Alarms", "EICR Inspections", "EV Chargers"],
    accreditationBody: "NICEIC Approved Contractor",
    accreditationNumber: "NIC-604491",
    publicLiabilityCover: "£10,000,000",
    publicLiabilityInsurer: "AXA Insurance UK",
    insuranceExpiry: "28 Jan 2027",
    registeredAddress: "22 Staples Corner Business Park, Edgware Rd",
    postcode: "NW2 6LU",
    coverageRadius: "North & West London",
    contactName: "Julian Vance",
    contactEmailMasked: "j.va***@apexelectrical.co.uk",
    contactPhoneMasked: "+44 20 8452 ••••",
    claimed: false,
    rating: 4.8,
    completedJobs: 98,
  },
  {
    id: "ven-dir-03",
    companyName: "London Locksmiths & Physical Security Ltd",
    companyNumber: "07881029",
    vatNumber: "GB 788 1029 88",
    primaryTrade: "Locksmith & Security",
    secondaryTrades: ["Master Key Systems", "Door Hardware", "Access Control"],
    accreditationBody: "Master Locksmiths Association (MLA)",
    accreditationNumber: "MLA-003841",
    publicLiabilityCover: "£5,000,000",
    publicLiabilityInsurer: "Hiscox Business",
    insuranceExpiry: "03 Aug 2026",
    registeredAddress: "14 Camden High Street",
    postcode: "NW1 0JH",
    coverageRadius: "Central, North & East London",
    contactName: "Dave Harrington",
    contactEmailMasked: "d.ha***@londonlocksmiths.co.uk",
    contactPhoneMasked: "+44 20 7700 ••••",
    claimed: false,
    rating: 4.95,
    completedJobs: 215,
  },
  {
    id: "ven-dir-04",
    companyName: "Kensington Roofing & Drainage Specialists",
    companyNumber: "10398412",
    primaryTrade: "Roofing & Gutters",
    secondaryTrades: ["Leadwork", "CCTV Drain Surveys", "Emergency Tarping"],
    accreditationBody: "NFRC CompetentRoofer",
    accreditationNumber: "CR-19402",
    publicLiabilityCover: "£5,000,000",
    publicLiabilityInsurer: "Zurich UK",
    insuranceExpiry: "19 Oct 2026",
    registeredAddress: "Old Court Mews, Kensington",
    postcode: "W8 4QA",
    coverageRadius: "Kensington, Chelsea & Westminster",
    contactName: "Patrick O'Connor",
    contactEmailMasked: "p.oc***@kensingtonroofing.co.uk",
    contactPhoneMasked: "+44 20 7937 ••••",
    claimed: false,
    rating: 4.7,
    completedJobs: 64,
  },
  {
    id: "ven-dir-05",
    companyName: "Thames Valley Environmental & HVAC Services",
    companyNumber: "11492019",
    vatNumber: "GB 340 9912 60",
    primaryTrade: "HVAC & Air Quality",
    secondaryTrades: ["Ventilation", "Damp & Mould Remediation", "Air Con"],
    accreditationBody: "BESA / REFCOM",
    accreditationNumber: "REF-103982",
    publicLiabilityCover: "£5,000,000",
    publicLiabilityInsurer: "Allianz UK",
    insuranceExpiry: "09 Dec 2026",
    registeredAddress: "Bridges Riverside Park",
    postcode: "SW11 3RW",
    coverageRadius: "South West London & Surrey",
    contactName: "Sarah Jennings",
    contactEmailMasked: "s.je***@thamesvalleyhvac.co.uk",
    contactPhoneMasked: "+44 20 7228 ••••",
    claimed: false,
    rating: 4.85,
    completedJobs: 87,
  }
];

export type LandlordDisputeStatus = 'action_required' | 'under_review' | 'negotiating' | 'resolved';
export type LandlordDisputeCategory = 'deposit' | 'maintenance' | 'service_charge' | 'breach';

export interface DisputeDocketItem {
  id: string;
  name: string;
  type: 'pdf' | 'img' | 'doc';
  size: string;
  uploadedBy: string;
  date: string;
  description: string;
}

export interface DisputeAuditMessage {
  id: string;
  sender: 'landlord' | 'agent' | 'tenant' | 'arbitrator' | 'system';
  senderName: string;
  senderRole: string;
  senderInitials: string;
  timestamp: string;
  text: string;
  isActionLog?: boolean;
}

export interface LandlordDisputeRecord {
  id: string;
  reference: string;
  title: string;
  propertyId: string;
  propertyCode: string;
  propertyAddress: string;
  unit: string;
  tenantNames: string;
  tenantInitials: string;
  tenantEmail: string;
  tenantPhone: string;
  managingAgent: string;
  agencyName: string;
  agentEmail: string;
  category: LandlordDisputeCategory;
  categoryLabel: string;
  status: LandlordDisputeStatus;
  statusLabel: string;
  openedDate: string;
  deadlineDate: string;
  daysRemaining: number;
  slaUrgent?: boolean;
  statutoryScheme: string;
  depositHeld: number;
  monthlyRent: number;
  claimAmount: number;
  counterOfferAmount?: number;
  agreedSettlement?: number;
  currency: string;
  remedyClaimed: string;
  landlordPosition: string;
  outcome?: string;
  settledDate?: string;
  settledDuration?: string;
  evidenceDocket: DisputeDocketItem[];
  auditTrail: DisputeAuditMessage[];
}

export const INITIAL_LANDLORD_DISPUTES: LandlordDisputeRecord[] = [
  {
    id: "dsp-101",
    reference: "DSP-2024-0982",
    title: "En-suite Radiator Failure & Rental Interruption Concession",
    propertyId: "4",
    propertyCode: "KG-4B",
    propertyAddress: "Flat 4B, 18 Kensington Gardens, London W2 4QH",
    unit: "Flat 4B",
    tenantNames: "Oliver Davies & Clara Finch",
    tenantInitials: "OD",
    tenantEmail: "oliver.davies@example.co.uk",
    tenantPhone: "+44 7700 900142",
    managingAgent: "Eleanor Vance",
    agencyName: "Prime Living Management",
    agentEmail: "eleanor.vance@primeliving.co.uk",
    category: "maintenance",
    categoryLabel: "Maintenance & Repairs",
    status: "action_required",
    statusLabel: "Sign-Off Required",
    openedDate: "18 Sep 2024",
    deadlineDate: "28 Sep 2024",
    daysRemaining: 1,
    slaUrgent: true,
    statutoryScheme: "AST S.11 Housing Act 1985 (Landlord Repair Covenants)",
    depositHeld: 2450,
    monthlyRent: 2450,
    claimAmount: 185,
    counterOfferAmount: 0,
    currency: "£",
    remedyClaimed: "Rent deduction / operational credit of £185.00 against November rental statement for 4-day heating outage.",
    landlordPosition: "Contractor Apex Heating completed emergency TRV valve replacement on 20 Sep. Agent recommends settling with £185 credit to preserve long-term tenancy goodwill.",
    evidenceDocket: [
      {
        id: "doc-1",
        name: "Apex_Heating_JobSheet_4491.pdf",
        type: "pdf",
        size: "1.4 MB",
        uploadedBy: "Apex Heating Ltd",
        date: "20 Sep 2024",
        description: "Verified field job report detailing TRV valve seizure and completed replacement."
      },
      {
        id: "doc-2",
        name: "Tenant_Outage_Temperature_Log.pdf",
        type: "pdf",
        size: "340 KB",
        uploadedBy: "Oliver Davies",
        date: "19 Sep 2024",
        description: "Digital thermostat ambient temperature log showing 14.2°C during freeze window."
      },
      {
        id: "doc-3",
        name: "TRV_Hardware_Receipt_VanceHoldings.pdf",
        type: "pdf",
        size: "520 KB",
        uploadedBy: "Eleanor Vance",
        date: "21 Sep 2024",
        description: "Danfoss TRV thermostatic sensor invoice (£72.00 VAT inc)."
      }
    ],
    auditTrail: [
      {
        id: "msg-1",
        sender: "tenant",
        senderName: "Oliver Davies",
        senderRole: "Tenant (Lead)",
        senderInitials: "OD",
        timestamp: "18 Sep 2024 · 09:15",
        text: "The radiator in the master bedroom stopped heating entirely on Saturday morning. We logged ticket MN-102 and had to rely on a secondary ceramic heater for 4 nights."
      },
      {
        id: "msg-2",
        sender: "agent",
        senderName: "Eleanor Vance",
        senderRole: "Managing Agent",
        senderInitials: "EV",
        timestamp: "20 Sep 2024 · 14:30",
        text: "Apex Heating attended on 20 Sep and fitted a replacement Danfoss TRV. System is now fully balanced. Oliver Davies has formally requested £185.00 concession (approx 2 days pro-rata rent). Given their 3-year spotless tenure, I recommend Vance Holdings approves this credit."
      },
      {
        id: "msg-3",
        sender: "system",
        senderName: "Haven Compliance Engine",
        senderRole: "System Notification",
        senderInitials: "HC",
        timestamp: "21 Sep 2024 · 08:00",
        text: "Statutory SLA Watch: 24 hours remaining for Landlord executive determination before auto-escalation under AST grievance policy.",
        isActionLog: true
      }
    ]
  },
  {
    id: "dsp-102",
    reference: "DSP-2024-1104",
    title: "Check-out Deposit Dilapidations & Floor Parquet Scoring Dispute",
    propertyId: "1",
    propertyCode: "CM-08",
    propertyAddress: "8 Camden Mews, Camden, London NW1 9UX",
    unit: "Main Residence",
    tenantNames: "Elena Rostova",
    tenantInitials: "ER",
    tenantEmail: "elena.rostova@example.com",
    tenantPhone: "+44 7700 900511",
    managingAgent: "Marcus Vance",
    agencyName: "Vance Property Care",
    agentEmail: "marcus.vance@vanceholdings.co.uk",
    category: "deposit",
    categoryLabel: "Deposit Dilapidations",
    status: "under_review",
    statusLabel: "In Formal ADR (TDS)",
    openedDate: "16 Sep 2024",
    deadlineDate: "02 Oct 2024",
    daysRemaining: 6,
    slaUrgent: false,
    statutoryScheme: "Tenancy Deposit Scheme (TDS) Insured Adjudication",
    depositHeld: 1850,
    monthlyRent: 850,
    claimAmount: 780,
    counterOfferAmount: 330,
    currency: "£",
    remedyClaimed: "Deduction of £780.00 from £1,850.00 deposit held in TDS escrow for deep parquet gouges (£330) and unapproved bedroom feature wall (£450).",
    landlordPosition: "Check-in inventory dated 01 Jun 2023 recorded parquet as newly buffed and pristine. Tenant accepted £330 parquet restoration quote, but objects to £450 repainting cost citing fair wear and tear.",
    evidenceDocket: [
      {
        id: "doc-11",
        name: "CheckIn_Inventory_CamdenMews_Jun2023.pdf",
        type: "pdf",
        size: "3.8 MB",
        uploadedBy: "Marcus Vance",
        date: "01 Jun 2023",
        description: "Certified independent check-in inventory with 74 stamped condition photos."
      },
      {
        id: "doc-12",
        name: "CheckOut_Report_CamdenMews_Sep2024.pdf",
        type: "pdf",
        size: "4.2 MB",
        uploadedBy: "Marcus Vance",
        date: "16 Sep 2024",
        description: "Official check-out condition schedule highlighting living room deep gouges and painted wall."
      },
      {
        id: "doc-13",
        name: "French_Polish_Parquet_Quote_330.pdf",
        type: "pdf",
        size: "410 KB",
        uploadedBy: "Camden Wood Crafts Ltd",
        date: "17 Sep 2024",
        description: "Itemized quote for deep grain sanding and French lacquer blending."
      },
      {
        id: "doc-14",
        name: "Dulux_Repainting_Estimate_450.pdf",
        type: "pdf",
        size: "380 KB",
        uploadedBy: "Pimlico Decorators",
        date: "18 Sep 2024",
        description: "Quote for 3 coats of neutral emulsion to cover charcoal accent wall."
      }
    ],
    auditTrail: [
      {
        id: "msg-11",
        sender: "agent",
        senderName: "Marcus Vance",
        senderRole: "Letting Manager",
        senderInitials: "MV",
        timestamp: "16 Sep 2024 · 11:20",
        text: "Completed checkout report for 8 Camden Mews. Noted 2 major dilapidations: deep scrape on original oak parquet and unapproved charcoal paint in bedroom 2. Total remediation estimated at £780.00."
      },
      {
        id: "msg-12",
        sender: "tenant",
        senderName: "Elena Rostova",
        senderRole: "Outgoing Tenant",
        senderInitials: "ER",
        timestamp: "17 Sep 2024 · 16:40",
        text: "I accept responsibility for the furniture mover's scratch on the floor and agree to the £330 deduction. However, the bedroom paint is standard wear and tear over a 15-month tenancy and does not warrant a £450 penalty. I am raising this with TDS ADR."
      },
      {
        id: "msg-13",
        sender: "arbitrator",
        senderName: "TDS Case Officer #8821",
        senderRole: "Tenancy Deposit Scheme Adjudicator",
        senderInitials: "TDS",
        timestamp: "19 Sep 2024 · 10:15",
        text: "Dispute docket formalised under TDS Case Ref #TDS-LON-449182. Both parties have until 02 October 2024 to finalize submission bundles."
      }
    ]
  },
  {
    id: "dsp-103",
    reference: "DSP-2024-1215",
    title: "Unauthorized Short-Let Subletting & AST Clause 14.2 Covenant Breach",
    propertyId: "5",
    propertyCode: "RM-12",
    propertyAddress: "12 Richmond Hill Mansions, Richmond, Surrey TW10 6RF",
    unit: "Apartment 12",
    tenantNames: "Dr. Aris Thorne",
    tenantInitials: "AT",
    tenantEmail: "aris.thorne@example.ac.uk",
    tenantPhone: "+44 7700 900893",
    managingAgent: "Foxtons Richmond & Vance Portfolio",
    agencyName: "Foxtons Premier Management",
    agentEmail: "richmond.mgmt@foxtons.co.uk",
    category: "breach",
    categoryLabel: "Lease Covenant Breach",
    status: "action_required",
    statusLabel: "Legal Escalation Review",
    openedDate: "21 Sep 2024",
    deadlineDate: "27 Sep 2024",
    daysRemaining: 2,
    slaUrgent: true,
    statutoryScheme: "Section 8 Housing Act 1988 (Ground 12 - Breach of Tenancy Agreement)",
    depositHeld: 3200,
    monthlyRent: 3200,
    claimAmount: 950,
    counterOfferAmount: 0,
    currency: "£",
    remedyClaimed: "Formal immediate delisting, £950.00 administrative/concierge security fine recovery, and execution of Section 8 formal warning notice.",
    landlordPosition: "Building freeholder issued warning regarding Airbnb lockbox affixed to communal railings. Tenant claims it was a pet-sitter arrangement, but listing photos clearly identify Unit 12.",
    evidenceDocket: [
      {
        id: "doc-21",
        name: "Freeholder_Breach_Notice_RichmondMansions.pdf",
        type: "pdf",
        size: "890 KB",
        uploadedBy: "Managing Freeholder",
        date: "20 Sep 2024",
        description: "Official headlease non-compliance letter from Richmond Mansions Freehold Co."
      },
      {
        id: "doc-22",
        name: "ShortLet_Platform_Listing_Docket.pdf",
        type: "pdf",
        size: "2.1 MB",
        uploadedBy: "Foxtons Richmond",
        date: "21 Sep 2024",
        description: "Screenshots of active short-term listing with 3 verified guest reviews from August."
      },
      {
        id: "doc-23",
        name: "Draft_Section8_Notice_Ground12.pdf",
        type: "pdf",
        size: "640 KB",
        uploadedBy: "Vance Legal Counsel",
        date: "22 Sep 2024",
        description: "Prepared statutory notice seeking possession under Housing Act 1988."
      }
    ],
    auditTrail: [
      {
        id: "msg-21",
        sender: "agent",
        senderName: "David Sterling",
        senderRole: "Foxtons Portfolio Lead",
        senderInitials: "DS",
        timestamp: "21 Sep 2024 · 09:30",
        text: "The concierge contacted us regarding frequent weekend tourists accessing Flat 12 with keypad lockboxes. We located the active listing on Airbnb. This is an explicit breach of Clause 14.2 of the AST."
      },
      {
        id: "msg-22",
        sender: "tenant",
        senderName: "Dr. Aris Thorne",
        senderRole: "Tenant",
        senderInitials: "AT",
        timestamp: "22 Sep 2024 · 12:45",
        text: "I sincerely apologize. I was lecturing in Geneva and a visiting fellow used the apartment. The listing has been permanently deactivated. I request to settle any building administrative costs without legal escalation."
      },
      {
        id: "msg-23",
        sender: "landlord",
        senderName: "Vance Holdings Executive",
        senderRole: "Landlord Asset Team",
        senderInitials: "VH",
        timestamp: "22 Sep 2024 · 15:10",
        text: "We require full recovery of the £950 freeholder penalty fee and a signed legal undertaking before agreeing to suspend Section 8 proceedings."
      }
    ]
  },
  {
    id: "dsp-104",
    reference: "DSP-2024-0750",
    title: "Communal Lift Modernization Service Charge Apportionment",
    propertyId: "3",
    propertyCode: "SJ-03A",
    propertyAddress: "Unit 3A, St. John's Court, Clapham, London SW4 7JR",
    unit: "Unit 3A",
    tenantNames: "Maya Lin & S. Patel",
    tenantInitials: "ML",
    tenantEmail: "maya.lin@example.org",
    tenantPhone: "+44 7700 900674",
    managingAgent: "Eleanor Vance",
    agencyName: "Prime Living Management",
    agentEmail: "eleanor.vance@primeliving.co.uk",
    category: "service_charge",
    categoryLabel: "Service Charges & Arrears",
    status: "resolved",
    statusLabel: "Resolved & Closed",
    openedDate: "12 Aug 2024",
    deadlineDate: "26 Aug 2024",
    daysRemaining: 0,
    slaUrgent: false,
    statutoryScheme: "RICS Service Charge Residential Management Code",
    depositHeld: 1650,
    monthlyRent: 1650,
    claimAmount: 240,
    counterOfferAmount: 145,
    agreedSettlement: 145,
    currency: "£",
    remedyClaimed: "Tenant questioned £240.00 communal lift supplementary levy.",
    landlordPosition: "Managing agent provided certified RICS apportionment schedule. Vance Holdings authorized a £95 goodwill concession, settling the dispute at £145 credit.",
    outcome: "Mutually agreed £145 concession credited to September rent invoice. RICS compliance certificate filed.",
    settledDate: "18 Aug 2024",
    settledDuration: "4 days",
    evidenceDocket: [
      {
        id: "doc-31",
        name: "RICS_Apportionment_Certificate_StJohns.pdf",
        type: "pdf",
        size: "1.1 MB",
        uploadedBy: "Prime Living Management",
        date: "14 Aug 2024",
        description: "Official chartered surveyor calculation of per-unit communal lift expenditure."
      },
      {
        id: "doc-32",
        name: "Signed_Settlement_Docket_Aug2024.pdf",
        type: "pdf",
        size: "450 KB",
        uploadedBy: "Eleanor Vance",
        date: "18 Aug 2024",
        description: "Executed deed of compromise signed by tenant and landlord."
      }
    ],
    auditTrail: [
      {
        id: "msg-31",
        sender: "tenant",
        senderName: "Maya Lin",
        senderRole: "Tenant",
        senderInitials: "ML",
        timestamp: "12 Aug 2024 · 10:00",
        text: "We noticed an unexpected £240 supplementary communal levy on the August invoice. As ground floor residents, we believe lift replacement costs should be weighted according to floor level."
      },
      {
        id: "msg-32",
        sender: "agent",
        senderName: "Eleanor Vance",
        senderRole: "Managing Agent",
        senderInitials: "EV",
        timestamp: "15 Aug 2024 · 14:10",
        text: "Reviewed the headlease 4th schedule. Apportionment is on a rateable value basis rather than floor height. However, to avoid protracted dispute, Vance Holdings proposed a £95 goodwill adjustment."
      },
      {
        id: "msg-33",
        sender: "tenant",
        senderName: "Maya Lin",
        senderRole: "Tenant",
        senderInitials: "ML",
        timestamp: "18 Aug 2024 · 09:30",
        text: "Thank you for the prompt explanation and fair adjustment. We accept the £145 net figure and consider the matter closed."
      }
    ]
  }
];

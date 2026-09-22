/**
 * Core Domain Schema & Data Contracts
 *
 * This file serves as the official data contract between the Haven Next.js
 * frontend and the PostgreSQL backend API.
 *
 * All API endpoints should serialize JSON objects matching these TypeScript
 * interfaces using camelCase properties.
 */

// ==========================================
// 1. API Envelopes & Pagination
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ==========================================
// 2. User & Auth
// ==========================================

export type UserRole = "landlord" | "agent" | "tenant" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  organizationId?: string;
  createdAt: string;
}

// ==========================================
// 3. Properties (Database: properties)
// ==========================================

export interface CertificateSummary {
  name: string;
  status: string;
  valid: boolean;
  expiryDate?: string;
}

export interface PropertyRecord {
  id: string;
  code: string; // e.g. "KG-4B"
  title: string;
  address: string;
  type: "Residential" | "Commercial";
  subType: string;

  // Specs & Valuation
  bedrooms: number;
  bathrooms: number;
  epcRating: string; // "A" | "B" | "C" | "D" | "E"
  area: string; // e.g. "850 sq ft"
  valuation: string | number;
  certificates: CertificateSummary[];

  // Tenancy & Occupancy
  occupant: string;
  tenantId: string | null;
  tenancyInfo: string;
  isVacant: boolean;

  // Rent & Financials
  rent: string | number; // monthly rent (e.g. 2450.00 or "£2,450")
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

  // Compliance status
  complianceStatus: "valid" | "warning" | "action";
  complianceText: string;
}

// ==========================================
// 4. Tenants & Tenancies (Database: tenants)
// ==========================================

export interface TenantRecord {
  id: string;
  propertyId: string | null;
  initials: string;
  names: string;
  jointWith?: string;
  contact: string;
  property: string;
  unit: string;
  startDate: string; // ISO format or formatted
  endDate: string; // ISO format or formatted
  termType: string;
  rent: string | number;
  paymentMethod: string;
  ledgerStatus:
    | "Paid"
    | "Overdue (14 days)"
    | "Overdue (7 days)"
    | "Due in 3 days"
    | "Awaiting Setup"
    | "—";
  ledgerBadgeStyle: string;
  inviteStatus: string;
  isInvitePending?: boolean;
}

export interface TenantDetail extends TenantRecord {
  authId: string;
  email: string;
  phone: string;
  commencedDate: string;
  rentAmount: string | number;
  arrears: string | number;
  nextDue: string;
  fixedTerm: string;
  remainingMonths: string;
  depositAmount: string | number;
  depositScheme: string;
  oversightAgent: string;
  agencyName: string;
  vettingTier: string;
  emergencyContact: string;
}

// ==========================================
// 4b. Rent Ledger & Collections
// ==========================================

export type LedgerStatus =
  | "overdue_14"
  | "overdue_7"
  | "due_soon"
  | "paid_dd"
  | "paid_so"
  | "paid_bacs";

export interface LedgerRecord {
  id: string;
  propertyId: string;
  propertyCode: string;
  address: string;
  tenantId: string;
  tenant: string;
  tenantContact?: string;
  rent: number;
  dueDate: string;
  status: LedgerStatus;
  paymentMethod: "Direct Debit" | "Standing Order" | "BACS Transfer" | string;
  paidDate?: string;
  referenceNumber: string;
  daysOverdue?: number;
}

// ==========================================
// 5. Managing Agents (Database: agents)
// ==========================================

export interface AssignedAgentProperty {
  id: string;
  title: string;
  ref: string;
  tenant: string;
  astType: string;
  grantStart: string;
  grantExpiry: string;
  daysRemaining: string;
  status: string;
}

export interface AgentRecord {
  id: string;
  name: string;
  initials: string;
  agency: string;
  email: string;
  phone: string;
  location: string;
  assignedDate: string;
  authId: string;
  tier: "Full Management" | "Maintenance + Communication" | "Maintenance-only";
  tierColor: string;
  propertiesCount: number;
  portfolioScope: string;
  status: "Active" | "Pending Handover" | "Revoked";
  statusColor: string;
  revokeWarning: string;
  assignedPropertyCodes: string[];
}

export interface AgentDetail {
  agent: AgentRecord;
  properties: AssignedAgentProperty[];
}

// ==========================================
// 6. Maintenance Tickets (Database: maintenance_tickets)
// ==========================================

export type MaintenancePriority = "Urgent" | "High" | "Routine";
export type MaintenanceStatus = "Submitted" | "In Progress" | "Resolved";

export interface MaintenanceTicket {
  id: string;
  code: string; // e.g. "MN-104"
  propertyId: string | null;
  issue: string;
  loggedDate: string;
  property: string;
  address: string;
  tenant: string;
  tenancyStatus: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  contractor: string;
  contractorSub: string;
  isUnassigned?: boolean;
  category?: string;
  estimatedCost?: number | string;
  actualCost?: number | string;
}

// ==========================================
// 7. Statutory Compliance (Database: compliance_certificates)
// ==========================================

export interface ComplianceItem {
  id: string;
  propertyId: string | null;
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
  documentUrl?: string;
}

// ==========================================
// 8. Landlords / Portfolios (Database: landlords)
// ==========================================

export type LandlordStatus = "Active" | "Pending Verification" | "Archived";

export interface LandlordRecord {
  id: string;
  name: string;
  legalName?: string;
  initials: string;
  company?: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber?: string;
  status?: LandlordStatus;
  role?: string;
  entityType?: string;
  incorporationNumber?: string;
  hmrcUtr?: string;
  portfolioValue?: string | number;
  monthlyRent?: string | number;
  occupancyRate?: string;
  complianceRate?: string;
  nextReviewDate?: string;
  notes?: string;
  portfolioStats?: {
    totalProperties: number;
    activeTenancies: number;
    monthlyRentRoll: string | number;
    portfolioValuation: string | number;
    complianceScore: number;
    openTickets: number;
  };
  propertyIds: string[];
  agentIds: string[];
  tenantIds: string[];
}

export interface PaymentHistoryRecord {
  id: string
  period: string
  dateRange: string
  paidOn: string
  method: string
  transactionRef: string
  amount: string
  status: "Paid on Time" | "Pending" | "Overdue"
  year: string
}

export interface UpcomingPaymentSchedule {
  id: string
  month: string
  amount: string
  dueDate: string
  reference: string
  status: "Autopay Active" | "Scheduled"
}


export type DisputeStatus = 'open' | 'under_review' | 'resolved'
export type DisputeCategory = 'maintenance' | 'deposit' | 'rent' | 'breach' | 'other'

export interface DisputeRecord {
  id: string
  reference: string
  category: DisputeCategory
  categoryLabel: string
  title: string
  status: DisputeStatus
  statusLabel: string
  openedDate: string
  remedy: string
  outcome?: string
  settledTime?: string
  isSelected?: boolean
}

export interface DisputeChatMessage {
  id: string
  sender: 'agent' | 'tenant' | 'system'
  senderName: string
  senderInitials?: string
  timestamp: string
  text: string
}

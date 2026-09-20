export type PortfolioStatusFilter = "all" | "occupied" | "vacant" | "maintenance"

export interface PortfolioProperty {
  id: string
  title: string
  address: string
  unitType: string
  specs: string
  landlord: string
  tenantName: string
  tenantNote: string
  rentAmount: string
  paymentStatus: "Paid on Time" | "Due in 2 Days" | "Redacted"
  paymentStatusType: "success" | "warning" | "redacted"
  complianceSummary: string
  complianceValid: boolean
  mandateTier: "Tier 1: Full Management" | "Tier 2: Maint + Comms" | "Tier 3: Maintenance Only"
  status: "occupied" | "vacant" | "maintenance"
  isFinancialRestricted?: boolean
}
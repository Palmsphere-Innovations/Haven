// Single import point: `import { propertiesData, tenantsData, ... } from "@/lib/mock"`

export * from "./properties";
export * from "./agents";
export * from "./maintenance";
export * from "./compliance";
export * from "./relations";
export * from "./agent-operations";
export * from "./landlord";
export {
  type TenantRecord,
  type TenantDetail,
  tenantsData,
  tenantDataStore,
  getTenantById,
  type TenancyStageFilter,
  type RentPaymentRecord,
  type TenancyDocument,
} from "./tenants";

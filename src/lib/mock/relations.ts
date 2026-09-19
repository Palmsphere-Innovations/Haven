/**
 * Relations — lookups that span more than one mock data file.
 *
 * Each individual file (properties.ts, tenants.ts, etc.) stays a plain,
 * self-contained list plus its own single-entity lookups. Anything that
 * needs to join two entities together by id lives here instead, so the
 * raw data files don't end up importing each other in a tangle.
 */

import { propertiesData, type PropertyRecord } from "./properties";
import { tenantsData, type TenantRecord, getTenantById } from "./tenants";
import { getTicketsForProperty, type MaintenanceTicket } from "./maintenance";
import { getComplianceForProperty, type ComplianceItem } from "./compliance";

export interface PropertyWithRelations {
  property: PropertyRecord;
  tenant: TenantRecord | null;
  tickets: MaintenanceTicket[];
  compliance: ComplianceItem | undefined;
}

/** Everything connected to one property: its tenant, tickets, and compliance record. */
export function getPropertyWithRelations(propertyId: string): PropertyWithRelations | undefined {
  const property = propertiesData.find((p) => p.id === propertyId);
  if (!property) return undefined;

  return {
    property,
    tenant: property.tenantId ? getTenantById(property.tenantId) ?? null : null,
    tickets: getTicketsForProperty(propertyId),
    compliance: getComplianceForProperty(propertyId),
  };
}

export interface TenantWithProperty {
  tenant: TenantRecord;
  property: PropertyRecord | null;
}

/** A tenant plus the property they're linked to (null if unlinked). */
export function getTenantWithProperty(tenantId: string): TenantWithProperty | undefined {
  const tenant = getTenantById(tenantId);
  if (!tenant) return undefined;

  const property = tenant.propertyId
    ? propertiesData.find((p) => p.id === tenant.propertyId) ?? null
    : null;

  return { tenant, property };
}

/** Properties that currently have no tenant linked — useful for an "assign/invite" flow. */
export function getVacantProperties(): PropertyRecord[] {
  return propertiesData.filter((p) => p.tenantId === null);
}

/** Every tenant with their property attached in one shot — for a combined table view. */
export function getAllTenantsWithProperties(): TenantWithProperty[] {
  return tenantsData
    .map((t) => getTenantWithProperty(t.id))
    .filter((x): x is TenantWithProperty => x !== undefined);
}

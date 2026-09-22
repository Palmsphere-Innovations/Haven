/**
 * Rent Ledger & Cashflow Data Service
 *
 * Dynamically links payment records directly to the authoritative tenant dataset
 * (tenantsData / tenantDataStore in tenants.ts) and propertiesData in properties.ts.
 */

import { tenantsData, tenantDataStore } from "./tenants";
import { propertiesData } from "./properties";
import { parseCurrency } from "@/lib/formatters";
import type { LedgerRecord, LedgerStatus } from "@/types";

/**
 * Builds dynamic ledger records for a given month directly from the tenant mock records.
 */
export function buildLedgerFromTenants(month: string): LedgerRecord[] {
  const isCurrentMonth = month === "Oct 2025";
  const isSep = month === "Sep 2025";

  return tenantsData
    .filter((tenant) => tenant.propertyId !== null)
    .map((tenant) => {
      const property = propertiesData.find((p) => p.id === tenant.propertyId);
      const tenantDetail = tenantDataStore[tenant.id];
      const numericRent = parseCurrency(tenant.rent);
      const propCode = property?.code || `PR-${tenant.propertyId}`;
      const address = property?.address || tenant.property;

      // Map status dynamically based on the month
      let status: LedgerStatus = "paid_dd";
      let paidDate: string | undefined = undefined;
      let daysOverdue: number | undefined = undefined;
      let dueDate = "01 Oct 2025";

      if (isCurrentMonth) {
        // Oct 2025: uses the live tenant ledger status
        if (tenant.ledgerStatus === "Overdue (14 days)") {
          status = "overdue_14";
          dueDate = "28 Sep 2025";
          daysOverdue = 14;
        } else if (tenant.ledgerStatus === "Overdue (7 days)") {
          status = "overdue_7";
          dueDate = "05 Oct 2025";
          daysOverdue = 7;
        } else if (tenant.ledgerStatus === "Due in 3 days") {
          status = "due_soon";
          dueDate = "14 Oct 2025";
        } else {
          status = tenant.paymentMethod.toLowerCase().includes("direct")
            ? "paid_dd"
            : "paid_so";
          dueDate = "01 Oct 2025";
          paidDate = "01 Oct 2025, 06:30 BST";
        }
      } else if (isSep) {
        // Sep 2025: Historical reconciled payments for these same tenants
        dueDate = "01 Sep 2025";
        status = tenant.id === "2" ? "paid_bacs" : tenant.paymentMethod.toLowerCase().includes("direct") ? "paid_dd" : "paid_so";
        paidDate = tenant.id === "2" ? "04 Sep 2025" : "01 Sep 2025";
      } else {
        // Aug 2025: Historical reconciled payments
        dueDate = "01 Aug 2025";
        status = tenant.paymentMethod.toLowerCase().includes("direct") ? "paid_dd" : "paid_so";
        paidDate = "01 Aug 2025";
      }

      const cleanMonthKey = month.replace(/\s+/g, "").toUpperCase();
      const referenceNumber = `HAV-${cleanMonthKey}-${propCode}`;

      return {
        id: `ledger-${month.toLowerCase().replace(/\s+/g, "-")}-${tenant.id}`,
        propertyId: tenant.propertyId as string,
        propertyCode: propCode,
        address,
        tenantId: tenant.id,
        tenant: tenant.names,
        tenantContact: tenantDetail?.email || tenant.contact,
        rent: numericRent,
        dueDate,
        status,
        paymentMethod: tenant.paymentMethod,
        paidDate,
        referenceNumber,
        daysOverdue,
      };
    });
}

export const INITIAL_MONTHLY_LEDGERS: Record<string, LedgerRecord[]> = {
  "Oct 2025": buildLedgerFromTenants("Oct 2025"),
  "Sep 2025": buildLedgerFromTenants("Sep 2025"),
  "Aug 2025": buildLedgerFromTenants("Aug 2025"),
};

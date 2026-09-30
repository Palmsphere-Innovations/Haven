/**
 * Unified API Client Layer
 *
 * Provides a single point of interaction for fetching data across Haven.
 * - When `NEXT_PUBLIC_API_URL` is configured and active, it issues real HTTP requests
 *   to your backend server (e.g. Node.js/PostgreSQL).
 * - Otherwise, it falls back seamlessly to the in-memory mock datasets in `src/lib/mock/`.
 */

import { propertiesData, getPropertyById as getMockPropertyById } from "@/lib/mock/properties";
import { tenantsData, tenantDataStore } from "@/lib/mock/tenants";
import { agentsData, agentDataStore } from "@/lib/mock/agents";
import { maintenanceTickets } from "@/lib/mock/maintenance";
import { complianceCertificates } from "@/lib/mock/compliance";
import { landlordsData } from "@/lib/mock/landlord";

import type {
  PropertyRecord,
  TenantRecord,
  TenantDetail,
  AgentRecord,
  AgentDetail,
  MaintenanceTicket,
  ComplianceItem,
  LandlordRecord,
} from "@/types";

// Re-export Auth services & types
export { loginUser, registerUser, sendResetLink, verifyOtp } from "@/lib/auth";
export type {
  AuthUser,
  LoginResponse,
  RegisterResponse,
  ResetResponse,
  VerifyOtpResponse,
} from "@/lib/auth";

// Re-export Schema types
export * from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchFromApi<T>(endpoint: string, fallback: T): Promise<T> {
  if (!API_BASE) {
    return fallback;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[API] Fetch to ${endpoint} returned ${res.status}. Using fallback data.`);
      return fallback;
    }

    const payload = await res.json();
    return (payload?.data ?? payload) as T;
  } catch (err) {
    console.warn(`[API] Error reaching ${endpoint}. Falling back to mock data:`, err);
    return fallback;
  }
}

// ==========================================
// Properties API
// ==========================================

export async function getProperties(): Promise<PropertyRecord[]> {
  return fetchFromApi<PropertyRecord[]>("/properties", propertiesData);
}

export async function getPropertyById(id: string): Promise<PropertyRecord | null> {
  const mockItem = getMockPropertyById(id) || null;
  return fetchFromApi<PropertyRecord | null>(`/properties/${id}`, mockItem);
}

// ==========================================
// Tenants API
// ==========================================

export async function getTenants(): Promise<TenantRecord[]> {
  return fetchFromApi<TenantRecord[]>("/tenants", tenantsData);
}

export async function getTenantById(id: string): Promise<TenantDetail | null> {
  const mockItem = tenantDataStore[id] || null;
  return fetchFromApi<TenantDetail | null>(`/tenants/${id}`, mockItem);
}

// ==========================================
// Managing Agents API
// ==========================================

export async function getAgents(): Promise<AgentRecord[]> {
  return fetchFromApi<AgentRecord[]>("/agents", agentsData);
}

export async function getAgentById(id: string): Promise<AgentRecord | null> {
  const mockItem = agentsData.find((a) => a.id === id) || null;
  return fetchFromApi<AgentRecord | null>(`/agents/${id}`, mockItem);
}

export async function getAgentDetail(id: string): Promise<AgentDetail | null> {
  const mockItem = agentDataStore[id] || null;
  return fetchFromApi<AgentDetail | null>(`/agents/${id}/detail`, mockItem);
}

// ==========================================
// Maintenance API
// ==========================================

export async function getMaintenanceTickets(): Promise<MaintenanceTicket[]> {
  return fetchFromApi<MaintenanceTicket[]>("/maintenance", maintenanceTickets);
}

export async function createMaintenanceTicket(
  ticket: Partial<MaintenanceTicket>
): Promise<MaintenanceTicket> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/maintenance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });
      if (res.ok) {
        const payload = await res.json();
        return payload?.data ?? payload;
      }
    } catch (e) {
      console.warn("[API] Failed to post maintenance ticket to server:", e);
    }
  }

  // Fallback: Return a simulated local record
  const newTicket: MaintenanceTicket = {
    id: String(Date.now()),
    code: `MN-${Math.floor(100 + Math.random() * 900)}`,
    propertyId: ticket.propertyId || null,
    issue: ticket.issue || "Maintenance item",
    loggedDate: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    property: ticket.property || "Property",
    address: ticket.address || "London",
    tenant: ticket.tenant || "Occupant",
    tenancyStatus: "AST Active",
    priority: ticket.priority || "Routine",
    status: "Submitted",
    contractor: ticket.contractor || "Unassigned",
    contractorSub: "Awaiting contractor selection",
    isUnassigned: !ticket.contractor,
    category: ticket.category || "General",
  };

  return newTicket;
}

// ==========================================
// Statutory Compliance API
// ==========================================

export async function getComplianceCertificates(): Promise<ComplianceItem[]> {
  return fetchFromApi<ComplianceItem[]>("/compliance", complianceCertificates);
}

// ==========================================
// Landlord / Portfolio Profile API
// ==========================================

export async function getLandlordProfile(): Promise<LandlordRecord> {
  return fetchFromApi<LandlordRecord>("/landlord/me", landlordsData[0]);
}

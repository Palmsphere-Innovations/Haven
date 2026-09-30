import type {
  ForgotPasswordFormData,
  LoginFormData,
  SignUpFormData,
  VerifyOtpFormData,
} from "@/lib/validations/auth";
import type { UserRole } from "@/types/schema";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  organization?: string;
}

export const ROLE_PORTAL_MAP: Record<UserRole, string> = {
  landlord: "/dashboard",
  agent: "/agent/dashboard",
  tenant: "/tenant/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard",
};

export const DEMO_ACCOUNTS: AuthUser[] = [
  {
    id: "usr-landlord-01",
    email: "robert.smith@domain.co.uk",
    name: "Robert Sterling Smith",
    role: "landlord",
    phone: "+44 20 7946 0192",
    organization: "Sterling Mayfair Estates",
  },
  {
    id: "usr-agent-01",
    email: "sarah.agent@haven.co.uk",
    name: "Sarah Jenkins (Managing Agent)",
    role: "agent",
    phone: "+44 20 7946 0481",
    organization: "Prime London Residential Ltd",
  },
  {
    id: "usr-tenant-01",
    email: "emma.watson@tenant.haven.io",
    name: "Emma Watson",
    role: "tenant",
    phone: "+44 7700 900452",
    organization: "Flat 4B, 18 Kensington Gdns",
  },
  {
    id: "usr-vendor-01",
    email: "marcus@pimlicoplumb.co.uk",
    name: "Marcus Sterling (Pimlico Plumbers)",
    role: "vendor",
    phone: "+44 20 7924 8100",
    organization: "Pimlico Emergency Gas & Plumbing Ltd",
  },
  {
    id: "usr-admin-01",
    email: "admin@haven.io",
    name: "Haven Compliance & Audit",
    role: "admin",
    phone: "+44 20 8000 0001",
    organization: "Project Haven Global Operations",
  },
];

export const AUTH_STORAGE_KEY = "haven_auth_session";
export const AUTH_CHANGE_EVENT = "haven_auth_change";

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AuthUser;
    }
  } catch {
    // ignore JSON parse errors
  }
  return null;
}

export function setCurrentUser(user: AuthUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: user }));
  } catch {
    // ignore
  }
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: null }));
  } catch {
    // ignore
  }
}

export interface LoginResponse {
  success: true;
  requiresVerification: boolean;
  user: AuthUser;
}

export interface RegisterResponse {
  success: true;
  verificationRequired: boolean;
  user: AuthUser;
}

export interface ResetResponse {
  success: true;
  message: string;
}

export interface VerifyOtpResponse {
  success: true;
  user: AuthUser;
}

const mockDelay = (milliseconds = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export function resolveUserFromEmail(email: string): AuthUser {
  const normalized = email.trim().toLowerCase();
  const matched = DEMO_ACCOUNTS.find((acc) => acc.email.toLowerCase() === normalized);
  if (matched) return matched;

  // Pattern-based role inference
  let detectedRole: UserRole = "landlord";
  if (normalized.includes("agent") || normalized.includes("realtor")) {
    detectedRole = "agent";
  } else if (normalized.includes("tenant") || normalized.includes("renter")) {
    detectedRole = "tenant";
  } else if (
    normalized.includes("vendor") ||
    normalized.includes("contractor") ||
    normalized.includes("plumb") ||
    normalized.includes("repair")
  ) {
    detectedRole = "vendor";
  } else if (normalized.includes("admin")) {
    detectedRole = "admin";
  }

  // Derive human-readable name from email
  const namePart = normalized.split("@")[0].replace(/[._-]/g, " ");
  const formattedName = namePart
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    id: `usr-${Math.random().toString(36).substring(2, 9)}`,
    email,
    name: formattedName || "Haven User",
    role: detectedRole,
  };
}

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  await mockDelay();
  const user = resolveUserFromEmail(data.email);
  return {
    success: true,
    requiresVerification: true,
    user,
  };
}

export async function registerUser(
  data: SignUpFormData,
): Promise<RegisterResponse> {
  await mockDelay();
  const newUser: AuthUser = {
    id: `usr-${Math.random().toString(36).substring(2, 9)}`,
    email: data.email,
    name: data.fullName,
    role: data.role,
    phone: data.phone,
  };
  return {
    success: true,
    verificationRequired: true,
    user: newUser,
  };
}

export async function sendResetLink(
  data: ForgotPasswordFormData,
): Promise<ResetResponse> {
  await mockDelay();
  return {
    success: true,
    message: `Reset link sent to ${data.email}.`,
  };
}

export async function verifyOtp(
  _data: VerifyOtpFormData,
  context: AuthUser,
): Promise<VerifyOtpResponse> {
  await mockDelay();
  // Persist session
  setCurrentUser(context);
  return { success: true, user: context };
}

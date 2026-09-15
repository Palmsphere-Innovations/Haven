import type {
  ForgotPasswordFormData,
  LoginFormData,
  SignUpFormData,
  VerifyOtpFormData,
} from "@/lib/validations/auth";

export interface AuthUser {
  email: string;
  role: "landlord" | "agent";
}

export interface LoginResponse {
  success: true;
  requiresVerification: true;
  user: AuthUser;
}

export interface RegisterResponse {
  success: true;
  verificationRequired: true;
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

const mockDelay = (milliseconds = 1000) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  await mockDelay();
  return {
    success: true,
    requiresVerification: true,
    user: { email: data.email, role: "landlord" },
  };
}

export async function registerUser(
  data: SignUpFormData,
): Promise<RegisterResponse> {
  await mockDelay();
  return {
    success: true,
    verificationRequired: true,
    user: { email: data.email, role: data.role },
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
  data: VerifyOtpFormData,
  context: Pick<AuthUser, "email" | "role">,
): Promise<VerifyOtpResponse> {
  await mockDelay();
  return { success: true, user: context };
}

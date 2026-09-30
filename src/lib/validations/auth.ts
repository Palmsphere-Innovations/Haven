import { z } from "zod";

const ukPhoneRegex = /^(?:\+44\d{10}|(?:0\d{10}|0\d{3}\s?\d{3}\s?\d{4}))$/;

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().regex(ukPhoneRegex, "Enter a valid UK phone number."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter."),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((value) => value, {
      message: "You must agree to the terms.",
    }),
    role: z.enum(["landlord", "agent", "vendor", "tenant"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export const verifyOtpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

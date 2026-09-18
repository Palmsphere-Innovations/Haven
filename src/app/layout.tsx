import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DevRoleSwitcher } from "@/components/shared/dev-role-switcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haven — UK Estates Portfolio Management",
  description: "Unified UK Property Management Platform,The secure platform for verified property sourcing, digital tenancy agreements, and safe rent management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Google Material Symbols Outlined Font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="font-sans bg-[#F0F2F1] text-neutral-900 min-h-screen antialiased">
        {children}
        <DevRoleSwitcher />
      </body>
    </html>
  );
}
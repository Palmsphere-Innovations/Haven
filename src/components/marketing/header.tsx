import Link from "next/link";
import React from "react";
import { BrandLogo } from "./brand-logo";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="glass-nav fixed top-0 left-0 w-full z-50 border-b border-neutral-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link aria-label="Haven Homepage" className="flex items-center gap-3 group focus:outline-none" href="/">
          <div className="h-8 flex items-center">
            <BrandLogo />
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-10 text-sm font-medium text-neutral-600 tracking-tight">
          <Link className="hover:text-brand transition-colors py-1" href="/#features">
            Features
          </Link>
          <Link className="hover:text-brand transition-colors py-1" href="/#how-it-works">
            How it works
          </Link>
          <Link className="hover:text-brand transition-colors py-1" href="/#pricing">
            Pricing
          </Link>
          <Link className="hover:text-brand transition-colors py-1 text-emerald-800 font-semibold" href="/vendor/join">
            Contractors
          </Link>
        </nav>

        {/* Authentication & CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Button asChild variant="ghost" className="text-neutral-700 hover:text-brand hover:bg-transparent">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild className="text-sm font-medium bg-brand text-white px-4 sm:px-5 py-5 rounded-xl hover:bg-brand-hover active:scale-[0.99] transition-all shadow-sm cursor-pointer">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
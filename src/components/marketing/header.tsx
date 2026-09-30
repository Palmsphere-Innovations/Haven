"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contractors", href: "/vendor/join" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-nav fixed left-0 top-0 z-50 w-full border-b border-neutral-200/60 transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link aria-label="Haven Homepage" className="flex shrink-0 items-center gap-3 group focus:outline-none" href="/" onClick={() => setIsMenuOpen(false)}>
          <div className="flex h-8 items-center"><BrandLogo /></div>
        </Link>

        <nav aria-label="Main Navigation" className="hidden items-center space-x-8 text-sm font-medium tracking-tight text-neutral-600 md:flex lg:space-x-10">
          {navigation.map((item) => (
            <Link key={item.label} className={`py-1 transition-colors hover:text-brand ${item.label === "Contractors" ? "font-semibold text-emerald-800" : ""}`} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="text-neutral-700 hover:bg-transparent hover:text-brand">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild className="cursor-pointer rounded-xl bg-brand px-5 py-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-hover active:scale-[0.99]">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild className="h-9 rounded-lg bg-brand px-3.5 text-sm font-medium text-white hover:bg-brand-hover">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-marketing-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white/80 text-neutral-800 transition hover:bg-white"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-marketing-navigation" aria-label="Mobile navigation" className="border-t border-neutral-200 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-brand">
                {item.label}
              </Link>
            ))}
            <Link href="/sign-in" onClick={() => setIsMenuOpen(false)} className="mt-1 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-brand">
              Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

import type { ReactNode } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
       <div className="bg-brand-surface text-neutral-900 flex flex-col min-h-screen selection:bg-brand selection:text-white">

        <div className="hidden sm:block fixed top-0 left-0 right-0 z-50">
         <Header />
        </div>
         <main className="grow pt-28 sm:pt-32 pb-16">{children}</main>
         <Footer />
       </div>
  );
}

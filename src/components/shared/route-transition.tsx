"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

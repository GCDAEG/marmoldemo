"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
//icons

import DesktopMenu from "./Nav/DesktopMenu";
import MobileMenu from "./Nav/MobileMenu";
import { motion } from "framer-motion";
import { useWindowScroll } from "react-use";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { sections } from "@/lib/sections";

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const { y } = useWindowScroll();

  /* ---------------------------------------------
     Sección activa (limpio)
  --------------------------------------------- */
  const activeSection = useScrollSpy(sections.map((s) => s.id));

  return (
    <motion.nav
      layout
      ref={ref}
      className={cn(
        "sticky top-0 left-0 w-full z-200 transition-all shadow-sm h-20  bg-white",
      )}
    >
      <DesktopMenu sections={sections} activeSection={activeSection} />
      <MobileMenu sections={sections} activeSection={activeSection} />
    </motion.nav>
  );
}

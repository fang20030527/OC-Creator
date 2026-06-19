"use client";
import React from "react";
import { LocaleLink } from "@/components/locale-link";

export const Logo = () => {
  return (
    <LocaleLink
      href="/"
      className="relative z-20 mr-4 flex items-center gap-2 px-2 py-1 text-sm text-foreground"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded border border-[#6d4b35] bg-[#211713] font-serif text-xs font-semibold text-[#f7efe4] shadow-[3px_3px_0_#d8b28e]">
        OC
      </span>
      <span className="max-w-[11rem] truncate font-serif text-base font-semibold tracking-normal text-foreground sm:max-w-none">
        AI Fandom OC Creator
      </span>
    </LocaleLink>
  );
};

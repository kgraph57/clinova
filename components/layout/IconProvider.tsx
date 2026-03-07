"use client";

import { IconContext } from "@phosphor-icons/react";

export function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: "light", size: 24 }}>
      {children}
    </IconContext.Provider>
  );
}

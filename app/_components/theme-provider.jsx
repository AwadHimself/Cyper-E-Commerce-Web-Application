"use client";

import { ThemeProvider } from "next-themes";

export default function NextThemesProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

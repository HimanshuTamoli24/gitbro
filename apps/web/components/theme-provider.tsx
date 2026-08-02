"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useLocalStorage } from "@repo/ui";

const DEFAULT_ACCENT_COLOR = "#10B981";
const DEFAULT_RADIUS = "0.5rem";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [storedColor] = useLocalStorage("gitbro_accent_color", DEFAULT_ACCENT_COLOR);
  const [storedRadius] = useLocalStorage("gitbro_border_radius", DEFAULT_RADIUS);

  // Globally apply saved accent color and border radius across the whole app
  React.useEffect(() => {
    if (storedColor) {
      document.documentElement.style.setProperty("--primary", storedColor);
    }
    if (storedRadius) {
      document.documentElement.style.setProperty("--radius", storedRadius);
    }
  }, [storedColor, storedRadius]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

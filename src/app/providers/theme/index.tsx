import { type Theme, ThemeProviderContext } from "@/shared/model/theme";
import { useCallback, useEffect, useMemo, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const STORAGE_KEY = "ui-theme";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem(STORAGE_KEY, "light");
    } else if (theme === "light") {
      setTheme("system");
      localStorage.setItem(STORAGE_KEY, "system");
    } else {
      setTheme("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(STORAGE_KEY, theme);
        setTheme(theme);
      },
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

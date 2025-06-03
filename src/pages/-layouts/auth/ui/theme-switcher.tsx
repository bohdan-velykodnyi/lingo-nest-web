import { useTheme } from "@/shared/model/theme";
import { Button } from "@/shared/ui/kit/button";
import { Moon, Sun, SunMoon } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const chooseTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-full absolute bottom-4 right-4 lg:left-4 w-15 h-15"
      onClick={chooseTheme}
    >
      {theme === "light" && <Sun className="size-5" />}
      {theme === "dark" && <Moon className="size-5" />}
      {theme === "system" && <SunMoon className="size-5" />}
    </Button>
  );
};

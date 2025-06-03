import { useTheme } from "@/shared/model/theme";
import { Button } from "@/shared/ui/kit/button";
import { HalfMoon, Prohibition, SunLight } from "iconoir-react";

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
      className="rounded-full absolute bottom-4 left-4 w-15 h-15"
      onClick={chooseTheme}
    >
      {theme === "light" && <SunLight className="size-5" />}
      {theme === "dark" && <HalfMoon className="size-5" />}
      {theme === "system" && <Prohibition className="size-5" />}
    </Button>
  );
};

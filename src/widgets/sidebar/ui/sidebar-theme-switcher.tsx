import { useTheme } from "@/shared/model/theme";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/kit/sidebar";
import { Moon, Sun, SunMoon } from "lucide-react";

export const SidebarThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <SidebarMenuItem onClick={toggleTheme} className="cursor-pointer">
      <SidebarMenuButton
        asChild
        className="group relative h-11 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/80 hover:shadow-sm"
      >
        <div className="flex items-center gap-3 px-3">
          {theme === "light" && <Sun className="size-5" />}
          {theme === "dark" && <Moon className="size-5" />}
          {theme === "system" && <SunMoon className="size-5" />}
          <span className="font-medium group-data-[collapsible=icon]:hidden">
            Theme switch
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

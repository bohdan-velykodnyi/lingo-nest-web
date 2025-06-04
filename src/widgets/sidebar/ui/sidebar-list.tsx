import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/kit/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

import { SidebarThemeSwitcher } from "./sidebar-theme-switcher";
import { navSidebarList } from "../model/nav-sidebar-list.const";

export const SidebarList = () => {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1 px-2">
          {navSidebarList.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="group relative h-11 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/80 hover:shadow-sm"
              >
                <Link to={item.url} className="flex items-center gap-3 px-3">
                  <item.icon className="h-5 w-5 transition-colors " />
                  <span className="font-medium group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarThemeSwitcher />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

import { useBreakpoint } from "@/shared/lib";
import { useUser } from "@/shared/model/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/kit/sidebar";
import { BookOpen, ChevronRight, Settings, Users } from "lucide-react";

export const SidebarAvatar = () => {
  const { data } = useUser();
  const { isBelowMd } = useBreakpoint("md");

  const user = data?.getCurrentUser;

  return (
    <SidebarFooter className="border-t border-sidebar-border bg-gradient-to-r from-sidebar-background to-sidebar-background/95">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="h-12 rounded-lg hover:bg-sidebar-accent/80 transition-all duration-200 data-[state=open]:bg-sidebar-accent"
              >
                <div className="flex items-center gap-3 px-1">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback className="text-sm font-semibold">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold text-sidebar-foreground">
                      {user?.name}
                    </span>
                    <span className="text-xs text-sidebar-foreground/70">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg shadow-lg border-0 "
              side={isBelowMd ? "top" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback className="text-white">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Manage Students
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                Lesson History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

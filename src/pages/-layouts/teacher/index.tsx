import { SidebarInset, SidebarProvider } from "@/shared/ui/kit/sidebar";
import { AppSidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { Outlet } from "@tanstack/react-router";

export const TeacherLayout = () => (
  <SidebarProvider defaultOpen>
    <Header />
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <div className="p-6 pt-22 md:pt-6">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

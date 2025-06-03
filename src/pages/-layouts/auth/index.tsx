import { Card, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Outlet } from "@tanstack/react-router";

import { ReactComponent as Logo } from "./ui/logo.svg";
import { ThemeSwitcher } from "./ui/theme-switcher";

export const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center p-4 ">
    <Card className="w-full max-w-md shadow-lg border h-[570px]">
      <CardHeader className="space-y-1 text-center">
        <div className=" items-center justify-center justify-items-center ">
          <Logo className="w-[100px] [&_g]:!fill-[#4f46e5] dark:[&_g]:!fill-[#818cf8]" />
          <CardTitle className="text-3xl font-bold font-[borel] text-[#4f46e5] dark:text-[#818cf8] mt-3">
            NestLingo
          </CardTitle>
        </div>
      </CardHeader>
      <Outlet />
    </Card>

    <ThemeSwitcher />
  </div>
);

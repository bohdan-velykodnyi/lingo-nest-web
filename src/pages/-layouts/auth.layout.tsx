import { useTheme } from "@/shared/model/theme";
import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { Tabs, TabsContent, TabsTrigger } from "@/shared/ui/kit/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";

import { ReactComponent as Logo } from "./logo.svg";

type ActiveTab = "login" | "registration";

export const AuthLayout = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("login");
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border h-[570px]">
        <CardHeader className="space-y-1 text-center">
          <div className=" items-center justify-center justify-items-center ">
            <Logo className="w-[100px]" />
            <CardTitle className="text-2xl font-bold ">Lingo Nest</CardTitle>
          </div>
          <CardDescription>
            Sign in or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ActiveTab)}
            className="h-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <Link to="/auth/login" className="w-full">
                <TabsTrigger value="login" className="w-full">
                  Login
                </TabsTrigger>
              </Link>
              <Link to="/auth/registration" className="w-full">
                <TabsTrigger value="registration" className="w-full">
                  Registration
                </TabsTrigger>
              </Link>
            </TabsList>

            <TabsContent value={currentPath}>
              <Outlet />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
      <Button
        className="fixed bottom-4 right-4"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Switch theme
      </Button>
    </div>
  );
};

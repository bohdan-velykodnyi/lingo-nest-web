import { useStaticData } from "@/shared/lib/useStaticData";
import { navigation } from "@/shared/navigation";
import { CardContent, CardFooter } from "@/shared/ui/kit/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

type ActiveTab = "login" | "registration";

export const AuthFormLayout = () => {
  const tab = useStaticData((data) => data?.auth?.tab) as ActiveTab;
  const [activeTab, setActiveTab] = useState<ActiveTab>(tab);

  return (
    <>
      <CardContent className="h-full">
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ActiveTab)}
          className="h-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <Link to={navigation.auth.login} className="w-full">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
            </Link>
            <Link to={navigation.auth.registration} className="w-full">
              <TabsTrigger value="registration" className="w-full">
                Registration
              </TabsTrigger>
            </Link>
          </TabsList>

          <TabsContent value={tab}>
            <Outlet />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 text-center text-sm">
        <p>
          By continuing, you agree to our{" "}
          <Link to="/" className="text-primary">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link to="/" className="text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </>
  );
};

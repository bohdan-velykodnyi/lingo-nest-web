import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
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
import { Button } from "@/shared/ui/kit/button";
import { useTheme } from "@/shared/model/theme";

export const AuthLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border h-[498px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Lingo Nest</CardTitle>
          <CardDescription>
            Sign in or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
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

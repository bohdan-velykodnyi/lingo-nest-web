import { navigation } from "@/shared/navigation";
import { Button } from "@/shared/ui/kit/button";
import { CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearch } from "@tanstack/react-router";
import { ChevronLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../domain/reset-password.mutation";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../model/reset-password.schema";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useSearch({ from: "/auth/reset-password" });
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [forgotPassword, { loading }] = useResetPasswordMutation(() => {
    form.setError("password", {});
    form.setError("confirmPassword", {});
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = ({ password }) => {
    forgotPassword({
      variables: {
        resetPasswordDto: {
          newPassword: password,
          token,
        },
      },
    });
  };

  const onInvalid = () => {
    const passwordError = form.getFieldState("password").error?.message;
    const confirmPasswordError =
      form.getFieldState("confirmPassword").error?.message;

    if (passwordError) {
      toast.error(passwordError);
    }
    if (confirmPasswordError) {
      toast.error(confirmPasswordError);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-full grid content-start lg:content-center gap-5 lg:mb-5">
      <div className="grid gap-3 px-6">
        <div className="flex gap-3">
          <Link to={navigation.auth.login}>
            <Button size="icon" variant="outline">
              <ChevronLeft className="size-6" />
            </Button>
          </Link>
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        </div>
        <CardDescription>
          Create a new password for your account
        </CardDescription>
      </div>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>New password</FormLabel>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none top-5.5">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="px-10"
                      disabled={loading}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 top-5.5"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm password</FormLabel>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none top-5.5">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="px-10"
                      disabled={loading}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

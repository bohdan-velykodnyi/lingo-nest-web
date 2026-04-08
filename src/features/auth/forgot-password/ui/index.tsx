import { navigation } from "@/shared/navigation";
import { Button } from "@/shared/ui/kit/button";
import { CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Mail } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useForgotPasswordMutation } from "../domain/forgot-password.mutation";
import { emailSchema, type ForgotPasswordValues } from "../model/email.schema";

export const ForgotPassword = () => {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const [forgotPassword, { loading }] = useForgotPasswordMutation(() => {
    form.setError("email", {});
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = ({ email }) => {
    forgotPassword({
      variables: {
        forgotPasswordDto: {
          email,
        },
      },
    });
  };

  const onInvalid = () => {
    const error = form.getFieldState("email").error?.message;
    toast.error(error);
  };

  return (
    <div className="h-full grid content-start lg:content-center gap-5 lg:mb-5">
      <div className="flex gap-3 px-6">
        <Link to={navigation.auth.login}>
          <Button size="icon" variant="outline">
            <ChevronLeft className="size-6" />
          </Button>
        </Link>
        <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
      </div>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </FormControl>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none top-5.5">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </FormItem>
              )}
            />

            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </CardDescription>
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

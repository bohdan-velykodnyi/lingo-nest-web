import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useLoginMutation } from "../api/login.mutation";
import { type AuthFormValues, authSchema } from "../model/auth.schema";

export const LoginForm = () => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { loading }] = useLoginMutation(() => {
    form.setError("email", {});
    form.setError("password", {});
  });

  const onSubmit: SubmitHandler<AuthFormValues> = ({ email, password }) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  useEffect(() => {
    if (form.formState.errors.email) {
      toast.error(form.formState.errors.email.message);
    }
    if (form.formState.errors.password) {
      toast.error(form.formState.errors.password.message);
    }
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="link" className="px-0 font-normal " size="sm">
          Forgot password?
        </Button>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};

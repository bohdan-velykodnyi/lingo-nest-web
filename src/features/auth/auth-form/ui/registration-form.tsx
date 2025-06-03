import { UserRole } from "@/shared/api/graphql";
import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/kit/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegistrationMutation } from "../api/registration.mutation";
import { type AuthFormValues, authSchema } from "../model/auth.schema";

export const RegistrationForm = () => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [role, setRole] = useState<UserRole>(UserRole.Teacher);

  const [registration, { loading }] = useRegistrationMutation(() => {
    form.setError("email", {});
    form.setError("password", {});
  });

  const onSubmit: SubmitHandler<AuthFormValues> = ({ email, password }) => {
    registration({
      variables: {
        email,
        password,
        role,
      },
    });
  };

  const onInvalid = () => {
    const emailError = form.getFieldState("email").error?.message;
    const passwordError = form.getFieldState("password").error?.message;

    if (emailError) {
      toast.error(emailError);
    }
    if (passwordError) {
      toast.error(passwordError);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-4"
      >
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

        <RadioGroup
          className="flex h-8"
          onValueChange={(value) => setRole(value as UserRole)}
          value={role}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={UserRole.Teacher} id="r1" />
            <Label htmlFor="r1">Teacher</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={UserRole.Student} id="r2" />
            <Label htmlFor="r2">Student</Label>
          </div>
        </RadioGroup>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white self-end"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

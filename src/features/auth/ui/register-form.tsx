import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { authSchema, type AuthFormValues } from "../model/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../api/register.mutation";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/kit/radio-group";
import { Label } from "@/shared/ui/kit/label";

export const RegisterForm = () => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading, mutate } = useRegisterMutation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(mutate)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <RadioGroup className="flex h-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teacher" id="r1" />
            <Label htmlFor="r1">Teacher</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="r2" />
            <Label htmlFor="r2">Student</Label>
          </div>
        </RadioGroup>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white self-end"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

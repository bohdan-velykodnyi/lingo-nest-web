import { z } from "zod";

export const emailSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordValues = z.infer<typeof emailSchema>;

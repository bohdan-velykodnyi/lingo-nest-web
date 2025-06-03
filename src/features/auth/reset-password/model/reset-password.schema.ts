import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

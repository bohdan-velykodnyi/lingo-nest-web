import { z } from "zod";

export const addContactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type AddContactFormValues = z.infer<typeof addContactSchema>;

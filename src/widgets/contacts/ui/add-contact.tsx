import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAddContactMutation } from "../domain/add-contact.mutation";
import {
  type AddContactFormValues,
  addContactSchema,
} from "../model/add-contact.schema";

export const AddContact = () => {
  const form = useForm<AddContactFormValues>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      email: "",
    },
  });

  const [open, setOpen] = useState(false);
  const { mutation, handleError } = useAddContactMutation();
  const [addContact, { loading }] = mutation;

  const onSubmit: SubmitHandler<AddContactFormValues> = ({ email }) => {
    addContact({
      variables: {
        email,
      },
      onError: (error) => {
        handleError(error);
        form.setError("email", {});
      },
    });
  };

  const onInvalid = () => {
    const emailError = form.getFieldState("email").error?.message;

    if (emailError) {
      toast.error(emailError);
    }
  };

  const onClose = () => {
    setOpen(false);
    form.reset({ email: "" });
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:mx-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            id="add-contact-form"
          >
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Add a new student or teaching contact to your list.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Add Contact
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

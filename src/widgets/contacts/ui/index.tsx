import { ContactsList } from "./contacts-list";

export const Contacts = () => (
  <div className="flex flex-1 flex-col space-y-6">
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Manage your students and teaching contacts.
        </p>
      </div>
    </div>

    <div className="grid gap-8">
      <ContactsList />
    </div>
  </div>
);

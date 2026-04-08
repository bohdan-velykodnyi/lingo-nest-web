import { useBreakpoint } from "@/shared/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/kit/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Input } from "@/shared/ui/kit/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import {
  Calendar,
  ChevronRight,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import { AddContact } from "./add-contact";

export function ContactsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isBelowMd } = useBreakpoint("md");

  const contacts = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      level: "Intermediate",
      status: "Active",
      lastLesson: "May 28, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      level: "Advanced",
      status: "Active",
      lastLesson: "May 25, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 345-6789",
      level: "Beginner",
      status: "Inactive",
      lastLesson: "April 15, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 (555) 456-7890",
      level: "Fluent",
      status: "Active",
      lastLesson: "May 30, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 567-8901",
      level: "Intermediate",
      status: "Active",
      lastLesson: "June 1, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 678-9012",
      level: "Advanced",
      status: "Active",
      lastLesson: "May 29, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddContact />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredContacts.length} contact
        {filteredContacts.length !== 1 ? "s" : ""} found
      </div>

      {/* Mobile Card View */}
      {isBelowMd ? (
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        /* Desktop Table View */
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Lesson</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={contact.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {contact.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        contact.status === "Active" ? "outline" : "secondary"
                      }
                      className={
                        contact.status === "Active"
                          ? "text-green-500 border-green-200 bg-green-50"
                          : ""
                      }
                    >
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contact.lastLesson}</TableCell>
                  <TableCell>
                    <ContactActions contact={contact} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {filteredContacts.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <UserPlus className="h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No contacts found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first contact"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

function ContactCard({ contact }: { contact: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {contact.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">{contact.name}</h3>
              <Badge
                variant={contact.status === "Active" ? "outline" : "secondary"}
                className={`w-fit text-xs ${
                  contact.status === "Active"
                    ? "text-green-500 border-green-200 bg-green-50"
                    : ""
                }`}
              >
                {contact.status}
              </Badge>
            </div>
          </div>
          <ContactActions contact={contact} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>Last lesson: {contact.lastLesson}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactActions({ contact }: { contact: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <ChevronRight className="mr-2 h-4 w-4" />
          View Profile {contact.name}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Lesson
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          Send Message
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Phone className="mr-2 h-4 w-4" />
          Call Contact
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Remove Contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

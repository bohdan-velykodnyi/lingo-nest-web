import { apolloClient } from "@/shared/clients/graphql";
import { Toaster } from "@/shared/ui/kit/sonner";
import { ApolloProvider } from "@apollo/client";

import { RouterProvider } from "./providers/router";
import { ThemeProvider } from "./providers/theme";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <RouterProvider />
      <Toaster />
    </ThemeProvider>
  </ApolloProvider>
);

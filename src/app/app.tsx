import { Auth } from "@/pages/auth";
import { apolloClient } from "@/shared/clients/graphql";
import { ApolloProvider } from "@apollo/client";

import { ThemeProvider } from "./providers/theme";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Auth />
    </ThemeProvider>
  </ApolloProvider>
);

import { Auth } from "@/pages/auth";
import { ThemeProvider } from "./providers/theme";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/shared/clients/graphql";

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Auth />
      </ThemeProvider>
    </ApolloProvider>
  );
};

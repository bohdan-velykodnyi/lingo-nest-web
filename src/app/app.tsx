import { Auth } from "@/pages/auth";
import { ThemeProvider } from "./providers/theme";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Auth />
    </ThemeProvider>
  );
};

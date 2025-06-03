import { useTheme } from "@/shared/model/theme";
import { Button } from "@/shared/ui/kit/button";

export const Auth = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme}
      <h1>Title</h1>
      <h2>h22asdad</h2>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch theme
      </Button>
    </div>
  );
};

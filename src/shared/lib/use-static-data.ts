import { type StaticDataRouteOption, useMatches } from "@tanstack/react-router";

export const useStaticData = <T>(
  selector: (staticData?: StaticDataRouteOption) => T,
): T | undefined => {
  const match = useMatches({
    select: (matches) => matches.find((m) => !!selector(m.staticData)),
  });

  return selector(match?.staticData);
};

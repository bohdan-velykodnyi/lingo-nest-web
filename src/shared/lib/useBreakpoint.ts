import { useMediaQuery } from "usehooks-ts";

export const breakpoints = {
  xxs: 400,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1920,
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue =
    breakpoints[breakpointKey as keyof typeof breakpoints];

  const bool = useMediaQuery(
    `(max-width: ${breakpointValue}px) and (not (width: ${breakpointValue}px))`,
    {
      initializeWithValue: window.innerWidth <= breakpointValue,
    },
  );

  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/\D/g, "")),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>;
}

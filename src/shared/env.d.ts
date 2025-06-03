/// <reference types="vite/client" />

declare module "*.svg" {
  import type * as React from "react";
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

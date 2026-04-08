import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      { type: "app",      pattern: "./src/app" },
      { type: "pages",    pattern: "./src/pages/*" },
      { type: "widgets",  pattern: "./src/widgets/*" },
      { type: "features", pattern: "./src/features/*" },
      { type: "entities", pattern: "./src/entities/*" },
      { type: "shared",   pattern: "./src/shared" },
    ],
  },
  rules: {
    "boundaries/dependencies": [
      2,
      {
        default: "allow",
        rules: [
          // Layer isolation rules
          {
            from: [{ type: "shared" }],
            disallow: [
              { to: { type: "app" } },
              { to: { type: "pages" } },
              { to: { type: "widgets" } },
              { to: { type: "features" } },
              { to: { type: "entities" } },
            ],
            message: "Module lower layer ({{from.type}}) can't import module higher layer ({{to.type}})",
          },
          {
            from: [{ type: "entities" }],
            disallow: [
              { to: { type: "app" } },
              { to: { type: "pages" } },
              { to: { type: "widgets" } },
              { to: { type: "features" } },
            ],
            message: "Module lower layer ({{from.type}}) can't import module higher layer ({{to.type}})",
          },
          {
            from: [{ type: "features" }],
            disallow: [
              { to: { type: "app" } },
              { to: { type: "pages" } },
              { to: { type: "widgets" } },
            ],
            message: "Module lower layer ({{from.type}}) can't import module higher layer ({{to.type}})",
          },
          {
            from: [{ type: "widgets" }],
            disallow: [
              { to: { type: "app" } },
              { to: { type: "pages" } },
            ],
            message: "Module lower layer ({{from.type}}) can't import module higher layer ({{to.type}})",
          },
          {
            from: [{ type: "pages" }],
            disallow: [
              { to: { type: "app" } },
            ],
            message: "Module lower layer ({{from.type}}) can't import module higher layer ({{to.type}})",
          },

          // Entry-point / public API rules
          // shared and app: allow everything (no restriction needed with default: allow)
          // features, entities, widgets: only index.(ts|tsx) or *.page.tsx
          {
            disallow: [
              {
                to: {
                  type: ["features", "entities", "widgets"],
                  internalPath: "!{index.(ts|tsx),*.page.tsx}",
                },
              },
            ],
            message: "Module ({{to.type}}) should be imported using public API.",
          },
          // pages: allow layout files and everything under pages
          {
            disallow: [
              {
                to: {
                  type: "pages",
                  internalPath: "!{**/layout.{ts,tsx},**/*.layout.{ts,tsx},**}",
                },
              },
            ],
            message: "Module ({{to.type}}) should be imported using public API.",
          },
        ],
      },
    ],
  },
};
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
      {
        type: "app",
        pattern: "./src/app",
      },
      {
        type: "pages",
        pattern: "./src/app/pages/*",
      },
      {
        type: "features",
        pattern: "./src/features/*",
      },
      {
        type: "entities",
        pattern: "./src/entities/*",
      },
      {
        type: "shared",
        pattern: "./src/shared",
      },
    ],
  },
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "allow",
        rules: [
          {
            from: "shared",
            disallow: ["app", "features", "entities", "pages"],
            message:
              "Module lower layer (${file.type}) can't import module higher layer (${dependency.type})",
          },
          {
            from: "features",
            disallow: ["app", "pages"],
            message:
              "Module lower layer (${file.type}) can't import module higher layer (${dependency.type})",
          },
        ],
      },
    ],
    "boundaries/entry-point": [
      2,
      {
        default: "disallow",
        message: "Module (${file.type}) should be imported using public API.",

        rules: [
          {
            target: ["shared", "app"],
            allow: "**",
          },
          {
            target: ["features", "entities", "pages"],
            allow: ["index.(ts|tsx)", "*.page.tsx"],
          },
        ],
      },
    ],
  },
};

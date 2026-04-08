import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { eslintBoundariesConfig } from "./eslint.boundaries.js";
import pluginRouter from "@tanstack/eslint-plugin-router";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import { fixupConfigRules } from '@eslint/compat'

export default tseslint.config(
  { ignores: ["dist", "src/shared/ui/*"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...fixupConfigRules(pluginReact.configs.flat.recommended),
      ...pluginRouter.configs["flat/recommended"],
      ...fixupConfigRules(importPlugin.flatConfigs.recommended), 
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/router": pluginRouter,
      "eslint-plugin-import": importPlugin,
      "eslint-plugin-react": pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "arrow-body-style": ["warn", "as-needed"],
      "consistent-return": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "object-shorthand": "warn",
      "no-unneeded-ternary": "warn",
      "no-nested-ternary": "warn",
      "no-mixed-operators": "warn",
      'react/display-name': 'warn',
      complexity: ["off", 15],
      curly: "warn",
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "ReturnStatement > ConditionalExpression[alternate.type='Literal'][alternate.value=null]",
          message:
            "Avoid using a ternary operator to return null. Use an if statement or short-circuit evaluation instead.",
        },
      ],
      "@tanstack/router/create-route-property-order": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "variable",
          modifiers: ["const", "exported"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        {
          selector: "interface",
          filter: {
            regex: ".*Props$",
            match: true,
          },
          format: ["PascalCase"],
          custom: {
            regex: "^(?!I[A-Z])[A-Z][a-zA-Z0-9]*Props$",
            match: true,
          },
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-restricted-types": [
        "warn",
        {
          types: {
            FC: {
              message:
                "Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            },
            "React.FC": {
              message:
                "Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            },
            FunctionComponent: {
              message:
                "Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            },
            "React.FunctionComponent": {
              message:
                "Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            },
          },
        },
      ],
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-boolean-value": "warn",
      "react/hook-use-state": "warn",
      "react/jsx-no-constructed-context-values": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-array-index-key": "warn",
      "react/no-find-dom-node": "warn",
      "react/no-unstable-nested-components": "warn",
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      // "import/extensions": [
      //   "warn",
      //   "ignorePackages",
      //   {
      //     ts: "always",
      //     tsx: "always",
      //   },
      // ],
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            ["external", "internal"],
            ["parent", "sibling"],
            "index",
            "object",
          ],
          named: true,
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
  eslintBoundariesConfig
);

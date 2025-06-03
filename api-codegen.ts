import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: [`${process.env.VITE_API_BASE_URL}/graphql`, "client-schema.graphql"],
  documents: ["**/*graphql.ts"],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    "src/shared/api/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
      ],
    },
  },
};

export default config;

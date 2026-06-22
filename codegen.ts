import { CodegenConfig } from "@graphql-codegen/cli";
import './envConfig.ts'
 
const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API,
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      },
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "./src/__generated/graphql.schema.json": {
      plugins: [ "introspection"],
      schema: process.env.NEXT_PUBLIC_API
    }
  },
};

export default config;
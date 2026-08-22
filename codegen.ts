import { CodegenConfig } from "@graphql-codegen/cli";
import './envConfig.ts'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API,
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
    "./src/__generated__/graphql.schema.json": {
      plugins: ["introspection"],
      schema: process.env.NEXT_PUBLIC_API
    }
  },
};
export default config;
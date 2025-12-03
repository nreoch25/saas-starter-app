import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // External packages
            ["^@?\\w"],
            // Internal imports (not starting with .)
            ["^[^.]"],
            // Relative imports (including side-effect relative imports like CSS)
            ["^\\."],
            // Side-effect imports (non-relative, should be rare)
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;

import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "public/**",
      "build/**",
      ".github/**",
      ".cache/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    settings: {
      react: {
        version: "19.2.7",
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/set-state-in-effect": "off",
      "unused-imports/no-unused-imports": "error",
      "func-names": ["error", "never"],
      "prettier/prettier": "error",
      "prefer-destructuring": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-var-requires": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-throw-literal": "error",
    },
  },
];
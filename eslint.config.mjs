export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tsParser,
    },
    plugins: {
      jest,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "jest/no-disabled-tests": "warn",
      ...prettier.rules,
    },
  },
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    extends: [next],
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["apps/api/**/*.{js,ts}"],
    plugins: { "@nestjs": nestjs },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/unbound-method": "off",
    },
  },
]);

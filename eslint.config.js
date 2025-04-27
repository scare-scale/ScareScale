import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import astroEslintParser from "astro-eslint-parser";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs["all"], // In CommonJS, the `flat/` prefix is required.
  {
    rules: {***REMOVED***,
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
];

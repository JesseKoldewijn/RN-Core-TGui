/** @type {import("prettier").Options & import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  // General options
  semi: false,
  singleQuote: false,
  trailingComma: "es5",
  endOfLine: "auto",
  printWidth: 100,

  // Trivago Import Sort
  importOrder: ["^expo/(.*)$", "^react/(.*)$", "^react-native/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
}
module.exports = config

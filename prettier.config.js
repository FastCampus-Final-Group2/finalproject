const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["clsx", "cva", "tw", "cn"],
  printWidth: 120,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  useTabs: false,
  endOfLine: "auto",
};

export default config;

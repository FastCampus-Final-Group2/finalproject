import type { Config } from "tailwindcss";
import { colors, fonts, layout } from "./src/styles/theme";
import typography from "./src/styles/plugins/typography";
import { BG_50, BG_100, BG_350, BG_650, TEXT_50, TEXT_100, TEXT_350, TEXT_650 } from "./src/styles/smColor";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    ...fonts,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      ...layout,
    },
  },
  plugins: [typography, require("tailwind-scrollbar-hide")],
  safelist: [
    ...Object.values(BG_50),
    ...Object.values(BG_100),
    ...Object.values(BG_350),
    ...Object.values(BG_650),
    ...Object.values(TEXT_50),
    ...Object.values(TEXT_100),
    ...Object.values(TEXT_350),
    ...Object.values(TEXT_650),
  ],
};
export default config;

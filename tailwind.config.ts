import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // 사용자 정의 색상 추가
        // 예: text-color-FFFFFF-100
        // 예: bg-color-FFFFFF-100
        "color-FFFFFF-100": "#FFFFFF",
        "color-000000-0": "#000000",
        "color-191919-10": "#191919",
        "color-333333-20": "#333333",
        "color-4D4D4D-30": "#4D4D4D",
        "color-666666-40": "#666666",
        "color-808080-50": "#808080",
        "color-999999-60": "#999999",
        "color-B3B3B3-70": "#B3B3B3",
        "color-CCCCCC-80": "#CCCCCC",
        "color-E5E5E5-90": "#E5E5E5",
        "color-FDFDFD-97": "#FDFDFD",
      },
      fontSize: {
        // 예: text-22
        "22": "22px",
        "18": "18px",
        "16": "16px",
      },
      fontWeight: {
        // 예: font-Eb
        "Eb": "900",
        "B": "700",
        "M": "500",
      },
      lineHeight: {
        // 예: leading-120%
        "120%": "1.2",
        "140%": "1.4",
      },
      width: {
        // 예: w-1920
        "1920px": "1920px",
        "412px": "412px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.text-H_Eb_22': {
          fontSize: '22px',
          fontWeight: '900',
          lineHeight: '1.2',
        },
        '.text-H_B_22': {
          fontSize: '22px',
          fontWeight: '700',
          lineHeight: '1.2',
        },
        '.text-T_Eb_18': {
          fontSize: '18px',
          fontWeight: '900',
          lineHeight: '1.2',
        },
        '.text-T_M_18': {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '1.2',
        },
        '.text-B_B_16': {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '1.4',
        },
        '.text-B_M_16': {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '1.4',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover', 'focus', 'active']);
    },
  ],
};
export default config;

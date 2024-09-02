import { colors } from "@/styles/theme";

type ColorKey = keyof typeof colors;

type ColorScale<K extends ColorKey> = keyof (typeof colors)[K] extends string | number
  ? `${keyof (typeof colors)[K]}`
  : never;

type TextColor<K extends ColorKey> = K extends "white" | "black" ? `text-${K}` : `text-${K}-${ColorScale<K>}`;

export type TextColorType = TextColor<ColorKey>;

type BgColor<K extends ColorKey> = K extends "white" | "black" ? `bg-${K}` : `bg-${K}-${ColorScale<K>}`;

export type BgColorType = BgColor<ColorKey>;

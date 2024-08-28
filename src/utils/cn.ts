import { type ClassValue, clsx } from "clsx";
import { createTailwindMerge, getDefaultConfig } from "tailwind-merge";

const customTypographyClasses = [
  "text-H-28-B",
  "text-T-20-B",
  "text-T-20-M",
  "text-T-18-B",
  "text-T-18-M",
  "text-T-16-B",
  "text-T-16-M",
  "text-SB-14-B",
  "text-SB-14-M",
  "text-SB-14-R",
  "text-B-14-B",
  "text-B-14-M",
  "text-B-14-R",
  "text-C-12-M",
  "text-C-12-B",
];

const customTwMerge = createTailwindMerge(() => {
  const defaultConfig = getDefaultConfig();

  return {
    ...defaultConfig,
    cacheSize: 0,
    classGroups: {
      ...defaultConfig.classGroups,
      typography: customTypographyClasses,
    },
    conflictingClassGroups: {
      ...defaultConfig.conflictingClassGroups,
    },
  };
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

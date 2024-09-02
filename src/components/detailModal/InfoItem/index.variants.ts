import { cva } from "class-variance-authority";

export const valueVariants = cva("flex h-9 items-center rounded-4 border border-gray-200 p-2 text-gray-900", {
  variants: {
    line: {
      1: "w-[175px]",
      2: "w-[316px]",
      3: "w-[507px]",
    },
  },
});

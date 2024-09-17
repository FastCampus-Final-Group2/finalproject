import { cva } from "class-variance-authority";

export const itemVariants = cva("h-9 flex-shrink-0 px-3 py-2 text-gray-900 text-B-14-M", {
  variants: {
    isValid: {
      true: "bg-transparent",
      false: "bg-red-100",
    },
    isAddress: {
      true: "w-[344px]",
      false: "w-[140px]",
    },
  },
});

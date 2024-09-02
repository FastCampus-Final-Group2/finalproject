import { cva } from "class-variance-authority";

export const itemVariants = cva("h-9 w-[140px] flex-shrink-0 px-3 py-2 text-gray-900 text-B-14-M", {
  variants: {
    isError: {
      true: "bg-red-100",
      false: "bg-transparent",
    },
  },
});

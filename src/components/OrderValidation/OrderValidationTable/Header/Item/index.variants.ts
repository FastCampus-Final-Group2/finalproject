import { cva } from "class-variance-authority";

export const itemVariants = cva("relative h-9 w-[140px] flex-shrink-0 px-3 py-2 text-T-16-B", {
  variants: {
    isState: {
      true: "text-center",
      false: "",
    },
    isAddress: {
      true: "w-[344px]",
      false: "w-[140px]",
    },
  },
});

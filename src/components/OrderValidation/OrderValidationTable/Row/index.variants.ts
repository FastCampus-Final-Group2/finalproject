import { cva } from "class-variance-authority";

export const rowVariants = cva("flex w-max gap-4 px-4 py-1.5", {
  variants: {
    isOdd: {
      true: "rounded-none bg-white",
      false: "rounded-4 bg-gray-30",
    },
  },
});

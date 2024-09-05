import { cva } from "class-variance-authority";

export const rowVariants = cva("mx-4 my-1.5 flex h-9 w-[3104px] justify-start", {
  variants: {
    isOdd: {
      true: "rounded-none bg-white",
      false: "rounded-4 bg-gray-30",
    },
  },
});

import { cva } from "class-variance-authority";

export const buttonVariants = cva("flex items-center justify-center gap-3 rounded-lg p-3", {
  variants: {
    isError: {
      true: "bg-red-50",
      false: "bg-gray-100",
    },
  },
});

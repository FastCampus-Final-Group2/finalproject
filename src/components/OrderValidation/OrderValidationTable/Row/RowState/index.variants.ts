import { cva } from "class-variance-authority";

export const rowStateVariants = cva("flex h-full w-full items-center justify-center gap-1 text-T-16-B", {
  variants: {
    isValid: {
      true: "rounded-4 bg-blue-50 text-blue-500",
      false: "rounded-full bg-red-500 text-white",
    },
  },
});

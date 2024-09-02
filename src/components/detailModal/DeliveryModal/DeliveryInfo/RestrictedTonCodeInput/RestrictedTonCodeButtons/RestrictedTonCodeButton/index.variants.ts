import { cva } from "class-variance-authority";

export const buttonVariants = cva("flex h-8 w-12 items-center justify-center border-gray-200 px-2 py-1.5 text-B-14-M", {
  variants: {
    position: {
      all: "rounded-4 border",
      left: "rounded-l-4 border",
      middle: "border-y border-r",
      right: "rounded-r-4 border-y border-r",
    },
    isActive: {
      true: "bg-blue-500 text-white",
      false: "bg-blue-30 text-gray-900",
    },
  },
});

import { cva } from "class-variance-authority";

export const containerVariants = cva("flex h-9 flex-shrink-0 items-center px-3 py-2", {
  variants: {
    isValid: {
      true: "bg-transparent",
      false: "bg-red-100 focus:border focus:border-red-500",
    },
    isAddress: {
      true: "w-[344px]",
      false: "w-[140px]",
    },
  },
});

export const itemVariants = cva("h-full w-full bg-transparent text-gray-900 text-B-14-M", {
  variants: {
    isValid: {
      true: "",
      false: "focus:bg-white",
    },
  },
});

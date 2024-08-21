import { cva } from "class-variance-authority";

const inputVariants = cva("rounded-4 border-2 p-3 text-T-16-M", {
  variants: {
    width: {
      full: "w-full",
    },
    height: {
      landing: "h-[43px]",
    },
    state: {
      default: "border-gray-200 text-gray-800 focus:border-gray-800 [&:not(:placeholder-shown)]:border-gray-800",
      error: "border-red-500 text-red-500 placeholder:text-red-500 focus:border-red-500",
    },
  },
  defaultVariants: {
    width: "full",
    height: "landing",
  },
});

export default inputVariants;

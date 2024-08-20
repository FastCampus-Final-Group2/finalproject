import { cva } from "class-variance-authority";

const inputVariants = cva(
  "rounded-4 border-2 border-gray-200 p-3 text-gray-800 text-T-16-M focus:border-gray-800 [&:not(:placeholder-shown)]:border-gray-800",
  {
    variants: {
      width: {
        full: "w-full",
      },
      height: {
        landing: "h-[43px]",
      },
    },
    defaultVariants: {
      width: "full",
      height: "landing",
    },
  },
);

export default inputVariants;

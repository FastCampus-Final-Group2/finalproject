import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex h-9 w-[507px] items-center rounded-4 border border-gray-200 bg-blue-30 p-2 text-gray-900 text-B-14-M placeholder:text-gray-300",
  {
    variants: {
      hasValue: {
        true: "border-blue-500 pr-10",
        false: "border-gray-200",
      },
    },
  },
);

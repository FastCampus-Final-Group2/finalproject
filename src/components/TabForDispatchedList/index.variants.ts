import { cva } from "class-variance-authority";

export const tabClass = cva(
  "relative flex cursor-pointer items-center p-[12px]",
  {
    variants: {
      isSelected: {
        true: "text-black",
        false: "text-gray-700",
      },
    },
  }
);

export const numberClass = cva(
  "ml-[8px]",
  {
    variants: {
      isSelected: {
        true: "text-blue-500",
        false: "text-gray-300",
      },
    },
  }
);

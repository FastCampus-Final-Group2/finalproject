import { cva } from "class-variance-authority";

export const gnbTabVariants = cva(
  "group flex cursor-pointer items-center gap-5 rounded-t-lg border border-gray-700 py-[15px] pl-[17px] pr-4",
  {
    variants: {
      isPageOpened: {
        true: "border-white bg-white",
        false: "hover:border-white hover:bg-white",
      },
    },
  },
);

export const gnbTabContentVariants = cva("flex flex-1 items-center gap-1 text-T-18-B", {
  variants: {
    isPageOpened: {
      true: "text-blue-500",
      false: "text-gray-700 group-hover:text-blue-500",
    },
  },
});

export const gnbTabToggleIconVariants = cva("group-hover:text-blue-500", {
  variants: {
    isPageOpened: {
      true: "text-blue-500",
      false: "text-gray-700",
    },
  },
});

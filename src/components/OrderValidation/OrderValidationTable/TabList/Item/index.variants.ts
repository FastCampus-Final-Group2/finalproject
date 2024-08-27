import { cva } from "class-variance-authority";

export const tabVariants = cva("flex w-[120px] items-center justify-center gap-1 border-b-[5px] bg-white p-3", {
  variants: {
    isActiveTab: {
      true: "",
      false: "border-transparent",
    },
    isError: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      isActiveTab: true,
      isError: true,
      className: "border-red-500",
    },
    {
      isActiveTab: true,
      isError: false,
      className: "border-blue-500",
    },
  ],
});

export const tabValueVariants = cva("text-T-18-B", {
  variants: {
    isError: {
      true: "text-red-500",
      false: "text-blue-500",
    },
  },
});

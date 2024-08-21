import { cva } from "class-variance-authority";

export const tabClass = cva(
  "relative flex cursor-pointer items-center p-[12px]",
  {
    variants: {
      isSelected: {
        true: "text-black",
        false: "",
      },
      isCompleteOrAll: {
        true: "text-black",
        false: "",
      },
      isError: {
        true: "text-black",
        false: "text-black",
      },
    },
    compoundVariants: [
      { isSelected: false, isCompleteOrAll: false, isError: false, className: "text-gray-700" },
      { isSelected: false, isCompleteOrAll: true, isError: false, className: "text-black" },
      { isSelected: false, isCompleteOrAll: false, isError: true, className: "text-black" },
    ],
  }
);

export const numberClass = cva(
  "ml-[8px]",
  {
    variants: {
      isError: {
        true: "text-red-500",
        false: "",
      },
      isCompleteOrAll: {
        true: "text-blue-500",
        false: "",
      },
      isSelected: {
        true: "text-blue-500",
        false: "text-gray-300",
      },
    },
    compoundVariants: [
      { isError: false, isCompleteOrAll: false, isSelected: false, className: "text-gray-300" },
      { isError: true, isCompleteOrAll: false, isSelected: true, className: "text-red-500" },
      { isError: true, isCompleteOrAll: false, isSelected: false, className: "text-red-500" },
      { isError: false, isCompleteOrAll: true, isSelected: true, className: "text-blue-500" },
      { isError: false, isCompleteOrAll: true, isSelected: false, className: "text-blue-500" },
    ],
  }
);

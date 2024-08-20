import { cva } from "class-variance-authority";

const buttonVariants = cva("text-s flex cursor-pointer items-center justify-center rounded-4 text-SB-14-B", {
  variants: {
    height: {
      lg: "h-10",
      sm: "h-8",
    },
    state: {
      filled: "bg-blue-500 text-white",
      lined: "border-blue-500 text-blue-500",
      text: "border-none text-gray-900 hover:bg-gray-200",
      enabled: "cursor-default bg-gray-600 text-gray-300",
    },
  },
  defaultVariants: {
    height: "lg",
    state: "filled",
  },
});

export default buttonVariants;

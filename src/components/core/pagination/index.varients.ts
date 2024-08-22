import { cva } from "class-variance-authority";

const paginationClass = cva("flex items-center text-gray-900 gap-[5px]", {
  variants: {
    text: {
      bold: "text-B-14-B",
      medium: "text-B-14-M",
    },
  },
  defaultVariants: {
    text: "medium",
  },
});

export default paginationClass;

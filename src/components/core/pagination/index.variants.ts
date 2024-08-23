import { cva } from "class-variance-authority";

const paginationClass = cva("flex items-center justify-center text-gray-900 gap-[8px]", {
  variants: {
    text: {
      bold: "text-B-14-B w-[24] h-[28px]",
      medium: "text-B-14-M",
    },
    hover: {
      default: "",
      please: "hover:text-blue-500", // hover 상태일 때 색상 변경
    },
  },
  defaultVariants: {
    text: "medium",
    hover: "please",
  },
});

export default paginationClass;

import { cva } from "class-variance-authority";

const paginationClass = cva("flex items-center justify-center text-gray-900 gap-[8px] text-B-14-M ", {
  variants: {
    hover: {
      please: "hover:text-B-14-B",
      none: "",
    },
    active: {
      please: "relative !text-blue-500 text-B-14-B ",
      none: "",
    },
  },
  defaultVariants: {
    hover: "none",
    active: "none",
  },
});

export default paginationClass;

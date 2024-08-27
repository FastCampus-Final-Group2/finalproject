import { cva } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    type: {
      main: "text-gray-900 text-B-14-B",
      sub: "text-gray-900 text-B-14-M",
      alert: "text-red-500 text-B-14-M",
    },
  },
});

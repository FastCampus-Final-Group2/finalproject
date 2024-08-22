import { cva } from "class-variance-authority";

const globalNavBarTabItemVariants = cva("", {
  variants: {
    size: {
      m: "",
      s: "",
      i: "",
    },
    shape: {
      fill: "",
      text: "",
    },
    intent: {
      primary: "",
      secondary: "",
    },
  },
});

export default globalNavBarTabItemVariants;

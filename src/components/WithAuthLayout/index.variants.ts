import { cva } from "class-variance-authority";

export const mainVariants = cva("h-[calc(100vh-104px)] overflow-scroll bg-white scrollbar-hide", {
  variants: {
    isSNBOpened: {
      true: "w-[calc(100vw-224px)]",
      false: "w-[calc(100vw-72px)]",
    },
  },
});

import { cva } from "class-variance-authority";

export const snbMyMenuContainerVariants = cva("", {
  variants: {
    isSNBOpened: {
      true: "py-[2px] pl-[25px] pr-4",
      false: "flex justify-center",
    },
  },
});

export const snbMyMenuVariants = cva("group flex items-center gap-2 rounded-full hover:bg-white", {
  variants: {
    isSNBOpened: {
      true: "py-[7px] pl-[15px] pr-5",
      false: "justify-center p-2",
    },
  },
});

export const snbMySubMenuContainerVariants = cva("overflow-hidden transition-[height] duration-[10000]", {
  variants: {
    isMyMenuOpened: {
      true: "h-max",
      false: "h-0",
    },
  },
});

import { cva } from "class-variance-authority";

export const snbMenuContainerVariants = cva("", {
  variants: {
    isSNBOpened: {
      true: "py-[2px] pl-[25px] pr-4",
      false: "flex justify-center",
    },
  },
});

export const snbMenuVariants = cva("group flex items-center gap-2 rounded-full hover:bg-white", {
  variants: {
    isSNBOpened: {
      true: "py-[7px] pl-[15px] pr-5",
      false: "justify-center p-2",
    },
    isPageOpened: {
      true: "bg-white",
      false: "",
    },
  },
});

export const snbMenuIconVariants = cva("-translate-x-[1px] group-hover:text-blue-500", {
  variants: {
    isPageOpened: {
      true: "text-blue-500",
      false: "text-white",
    },
  },
});

export const snbMenuNameVariants = cva("flex w-[92px] text-T-18-B group-hover:text-blue-500", {
  variants: {
    isPageOpened: {
      true: "text-blue-500",
      false: "text-white",
    },
  },
});

export const snbSubMenuContainerVariants = cva("overflow-hidden transition-[height] duration-[10000]", {
  variants: {
    isMenuOpened: {
      true: "h-max",
      false: "h-0",
    },
  },
});

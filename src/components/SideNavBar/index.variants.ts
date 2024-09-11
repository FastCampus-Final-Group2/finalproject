import { cva } from "class-variance-authority";

export const snbVariants = cva(
  "relative z-nav flex flex-col gap-5 bg-gray-900 pb-[60px] transition-[width] duration-500",
  {
    variants: {
      isSNBOpened: {
        true: "w-snb-open",
        false: "w-snb-close",
      },
    },
  },
);

export const logoVariants = cva("h-[120px]", {
  variants: {
    isSNBOpened: {
      true: "px-10 py-9",
      false: "px-5 py-[44px]",
    },
  },
});

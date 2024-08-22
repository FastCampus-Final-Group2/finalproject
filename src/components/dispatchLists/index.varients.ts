import { cva } from "class-variance-authority";

const dispatchListClass = cva("flex items-center gap-[16px] px-[24px] py-[6px] text-gray-900", {
  variants: {
    backgroundColor: {
      header: "bg-blue-30",
      body: "bg-white",
    },
    borderBottom: {
      please: "border-b border-gray-200",
    },
    width: {
      default: "w-full",
      extraSmall: "w-[60px]",
      small: "w-[180px]",
      medium: "w-[200px]",
      large: "w-[260px]",
      extraLarge: "w-[348px]"
    },
    text: {
      small: "text-B-14-M",
      medium: "text-T-16-B",
    },
    hover: {
      please: "hover:bg-gray-100",
    }
  },
  defaultVariants: {
    width: "default",
    text: "small",
  },
});


export { dispatchListClass };

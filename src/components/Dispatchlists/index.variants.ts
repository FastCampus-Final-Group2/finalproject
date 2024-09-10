import { cva } from "class-variance-authority";

const dispatchListClass = cva("flex items-center gap-[16px] px-[24px] py-[6px] text-gray-900", {
  variants: {
    backgroundColor: {
      header: "bg-blue-30",
      body: "bg-white",
    },
    width: {
      default: "w-full",
      extraSmall: "w-[60px]",
      small: "w-[180px] flex justify-between items-center",
      medium: "w-[200px]",
      large: "w-[260px]",
      extraLarge: "w-[348px]"
    },
    height: {
      please: "h-[50px]",
    },
    text: {
      small: "text-B-14-M",
      medium: "text-T-16-B",
    },
    hover: {
      please: "hover:bg-gray-100",
    },
    isChecked: {
      please: "bg-gray-300",
    },
  },
  defaultVariants: {
    width: "default",
    text: "small",
  },
});


export { dispatchListClass };

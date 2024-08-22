import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "flex cursor-pointer items-center justify-center rounded-4 disabled:cursor-default disabled:bg-gray-600 disabled:text-gray-300 aria-disabled:cursor-default aria-disabled:bg-gray-600 aria-disabled:text-gray-300",
  {
    variants: {
      size: {
        m: "h-[49px] px-3 py-4",
        s: "h-[41px] px-3 py-3",
        i: "h-8 gap-[6px] px-2 pb-2 pt-[7px]",
      },
      shape: {
        fill: "text-SB-14-B",
        text: "text-gray-900 text-SB-14-M hover:text-SB-14-B",
      },
      intent: {
        primary: "",
        secondary: "",
      },
    },
    compoundVariants: [
      {
        shape: "fill",
        intent: "primary",
        className: "bg-blue-500 text-white hover:bg-blue-600",
      },
      {
        shape: "fill",
        intent: "secondary",
        className: "bg-gray-100 text-gray-900 hover:bg-red-500 hover:text-white",
      },
      {
        size: "s",
        shape: "text",
        intent: "primary",
        className: "bg-transparent text-blue-500 hover:text-blue-600",
      },
      {
        size: "i",
        className: "group bg-gray-100 text-gray-900 hover:bg-red-500 hover:text-white",
      },
    ],
    defaultVariants: {
      size: "m",
      shape: "fill",
      intent: "primary",
    },
  },
);

export default buttonVariants;

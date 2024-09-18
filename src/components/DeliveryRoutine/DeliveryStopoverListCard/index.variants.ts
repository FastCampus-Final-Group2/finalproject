import { cva } from "class-variance-authority";

export const DeliveryStopoverListCardClass = cva(
  "p-[16px] rounded-[8px] w-[380px] flex gap-[16px] items-center box-border justify-between focus:border-blue-500 focus:border-[2px]  hover:border-[2px] hover:border-blue-500 border-gray-200 cursor-default",
  {
    variants: {
      background: {
        default: "bg-white ",
        delayed: "bg-red-50",
        start: "bg-blue-30",
        restOrCancel: "",
      },
      border: {
        default: "border-[2px] h-[88px] border-gray-200 ",
        delayed: "border-[2px] h-[88px] border-red-500",
        deliveryStartEnd: "border-none",
        restOrCancel: "border-[2px] h-[88px]border-gray-200 hover:border-gray-200",
      },
    },
    compoundVariants: [
      {
        background: "delayed",
        border: "delayed",
      },
      {
        background: "start",
        border: "default",
      },
      {
        border: "deliveryStartEnd",
        className: "border-none",
      },
      {
        border: "restOrCancel",
        className: "border-gray-200 hover:border-gray-200",
      },
    ],
    defaultVariants: {
      background: "default",
      border: "default",
    },
  },
);

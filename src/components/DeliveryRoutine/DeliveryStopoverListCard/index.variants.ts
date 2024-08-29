import { cva } from "class-variance-authority";

export const DeliveryStopoverListCardClass = cva(
  "p-[16px] rounded-[8px] w-[380px] flex gap-[16px] items-start box-border justify-between focus:border-blue-500 focus:border-[2px] hover:border-blue-500 hover:border-[2px]",
  {
    variants: {
      background: {
        default: "bg-white",
        delayed: "bg-red-50",
        start: "bg-blue-30",
      },
      border: {
        default: "border-[2px] border-gray-200",
        delayed: "border-[2px] border-red-500",
        deliveryStartEnd: "border-none",
      },
      height: {
        default: "",
        cancelled: "h-[88px]",
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
    ],
    defaultVariants: {
      background: "default",
      border: "default",
      height: "default",
    },
  },
);

import { cva } from "class-variance-authority";

export const deliveryStatusClass = cva(
  "rounded-[4px] h-[28px] !text-B-14-B w-[65px] flex justify-center items-center",
  {
    variants: {
      text: {
        default: "text-white",
        waiting: "text-gray-500",
        delayed: "text-white",
        completed: "text-blue-400",
        cancelled: "text-gray-200",
        resting: "text-orange-500"
      },
      background: {
        default: "bg-blue-400",
        waiting: "bg-gray-100",
        delayed: "bg-red-500",
        completed: "bg-blue-30",
        cancelled: "bg-gray-500",
        resting: "bg-orange-100"
      },
    },
    compoundVariants: [
      {
        text: "waiting",
        className: "text-gray-500 bg-gray-100",
      },
      {
        text: "delayed",
        className: "text-white bg-red-500",
      },
      {
        text: "completed",
        className: "text-blue-400 bg-blue-30",
      },
      {
        text: "cancelled",
        className: "text-gray-200 bg-gray-500",
      },

      {
        text: "resting",
        className: "text-orange-500 bg-orange-100",
      },
    ],
    defaultVariants: {
      text: "default",
      background: "default",
    },
  }
);

import { cva } from "class-variance-authority";

export const deliveryStatusClass = cva(
  "rounded-[4px] h-[28px] text-B-14-B w-[65px] flex justify-center items-center gap-[4px]",
  {
    variants: {
      vehicleStatus: {
        default: "text-white",
        WORK_START: "text-white",
        WORK_WAITING: "text-gray-500",
        WORK_COMPLETED: "text-blue-400",
        MOVING: "text-white",
        CANCELED: "text-gray-200",
        DELIVERY_DELAY: "text-white",
        RESTING: "text-orange-500",
        RESTING_TIME: "text-gray-700",
      },
      background: {
        default: "bg-blue-400",
        WORK_START: "bg-blue-400",
        WORK_WAITING: "bg-gray-100",
        WORK_COMPLETED: "bg-blue-30",
        MOVING: "bg-blue-400",
        CANCELED: "bg-gray-500",
        DELIVERY_DELAY: "bg-red-500",
        RESTING: "bg-orange-100",
        RESTING_TIME: "bg-gray-100",
      },
    },
    compoundVariants: [

      {
        vehicleStatus: "WORK_START",
        className: "text-white bg-blue-400",
      },
      {
        vehicleStatus: "WORK_WAITING",
        className: "text-gray-500 bg-gray-100",
      },
      {
        vehicleStatus: "WORK_COMPLETED",
        className: "text-blue-400 bg-blue-30",
      },
      {
        vehicleStatus: "MOVING",
        className: "text-white bg-blue-400",
      },
      {
        vehicleStatus: "CANCELED",
        className: "text-gray-200 bg-gray-500",
      },
      {
        vehicleStatus: "DELIVERY_DELAY",
        className: "text-white bg-red-500",
      },
      {
        vehicleStatus: "RESTING",
        className: "text-orange-500 bg-orange-100",
      },
      {
        vehicleStatus: "RESTING_TIME",
        className: "text-gray-700 bg-gray-100 text-B-14-M",
      },
    ],
    defaultVariants: {
      vehicleStatus: "default",
      background: "default",
    },
  }
);

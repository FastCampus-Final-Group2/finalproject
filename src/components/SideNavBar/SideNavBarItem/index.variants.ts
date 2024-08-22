import { cva } from "class-variance-authority";

export const containerVariants = cva("", {
  variants: {
    snb: {
      open: "py-[2px] pl-[25px] pr-4",
      close: "flex justify-center",
    },
  },
});

export const buttonVariants = cva(`group flex items-center gap-2 rounded-full hover:bg-white`, {
  variants: {
    snb: {
      open: "py-[7px] pl-[15px] pr-5",
      close: "justify-center p-2",
    },
    page: {
      open: "bg-white",
      close: "",
    },
  },
});

export const iconVariants = cva(`-translate-x-[1px] group-hover:text-blue-500`, {
  variants: {
    page: {
      open: "text-blue-500",
      close: "text-white",
    },
  },
});

// export const labelVariants = cva("", {
//   variants: {
//     page: {
//       open: "text-blue-500",
//       close: "text-white",
//     },
//   },
// });

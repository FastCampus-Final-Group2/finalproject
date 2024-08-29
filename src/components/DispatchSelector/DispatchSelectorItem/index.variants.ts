import { cva } from "class-variance-authority";

export const containerVariants = cva("group flex flex-col gap-8 rounded-2xl px-8 pb-8 pt-10", {
  variants: {
    disabled: {
      true: "bg-gray-100",
      false: "bg-blue-30 hover:bg-blue-50",
    },
  },
});

export const titleVariants = cva("w-fit text-T-20-B", {
  variants: {
    disabled: {
      true: "text-gray-700",
      false: "text-blue-500",
    },
  },
});

export const thumbnailVariants = cva("shadow-thumbnail h-[360px] w-[560px] overflow-hidden rounded-2xl border", {
  variants: {
    disabled: {
      true: "border-blue-100",
      false: "",
    },
  },
});

export const imageVariants = cva("", {
  variants: {
    disabled: {
      true: "",
      false: "group-hover:hidden",
    },
  },
});

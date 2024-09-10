import { cva } from "class-variance-authority";

export const fileInputVariants = cva(
  "flex h-[176px] w-[456px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-4 py-8",
  {
    variants: {
      hasFile: {
        true: "gap-5 border-blue-400 bg-blue-30",
        false: "gap-4 border-gray-400 bg-gray-30",
      },
    },
  },
);

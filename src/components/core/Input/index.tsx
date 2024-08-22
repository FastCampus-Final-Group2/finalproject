import { cn } from "@/utils/cn";
import React from "react";
import inputVariants from "./index.variants";
import { VariantProps } from "class-variance-authority";

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "width" | "height">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function RefInput(
  { width, height, state, className, ...props },
  ref,
) {
  return <input className={cn(inputVariants({ width, height, state }), className)} ref={ref} {...props} />;
});

export default Input;

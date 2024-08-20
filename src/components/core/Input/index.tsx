import { cn } from "@/utils/cn";
import React from "react";
import inputVariants from "./index.variants";
import { VariantProps } from "class-variance-authority";

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function RefInput({ size, className, ...props }, ref) {
  return <input className={cn(inputVariants({ size }), className)} ref={ref} {...props} />;
});

export default Input;

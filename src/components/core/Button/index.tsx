import { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import buttonVariants from "./index.variants";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "height">,
    VariantProps<typeof buttonVariants> {}

function Button({ height, state, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ height, state }), className)} {...props}>
      {children}
    </button>
  );
}

export default Button;

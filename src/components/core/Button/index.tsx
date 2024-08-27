import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import buttonVariants from "./index.variants";
import type { IconId } from "@/components/core/Icon";
import Icon from "@/components/core/Icon";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  iconId?: IconId;
  children?: string;
}

function Button({ size, shape, intent, iconId, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ size, shape, intent }), className)} {...props}>
      {iconId && <Icon id="circleCancelFill" className="text-gray-900 group-hover:text-white" />}
      {children}
    </button>
  );
}

export default Button;

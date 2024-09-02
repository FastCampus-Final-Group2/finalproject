import type { Ton } from "@/types/tonCode";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./index.variants";
import { VariantProps } from "class-variance-authority";

interface RestrictedTonCodeButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  tonCode: Ton | "전체";
}

const RestrictedTonCodeButton = ({ tonCode, position, isActive, ...props }: RestrictedTonCodeButtonProps) => {
  return (
    <button type="button" className={cn(buttonVariants({ position, isActive }))} {...props}>
      {tonCode}
    </button>
  );
};

export default RestrictedTonCodeButton;

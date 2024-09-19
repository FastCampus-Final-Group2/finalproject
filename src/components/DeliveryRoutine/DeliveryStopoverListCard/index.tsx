import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { DeliveryStopoverListCardClass } from "./index.variants";

interface DeliveryStopoverListCardProps extends VariantProps<typeof DeliveryStopoverListCardClass> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DeliveryStopoverListCard = ({
  background,
  border,
  children,
  className,
  height,
  onClick,
  ...props
}: DeliveryStopoverListCardProps) => {
  return (
    <>
      <div
        className={cn(DeliveryStopoverListCardClass({ background, border, height }))}
        {...props}
        onClick={onClick}
        role="button"
      >
        {children}
      </div>
    </>
  );
};

export default DeliveryStopoverListCard;

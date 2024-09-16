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
  onClick,
  ...props
}: DeliveryStopoverListCardProps) => {
  return (
    <>
      <div
        className={cn(DeliveryStopoverListCardClass({ background, border }))}
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

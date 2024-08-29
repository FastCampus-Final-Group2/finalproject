import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { DeliveryStopoverListCardClass } from "./index.variants";

interface DeliveryStopoverListCardProps extends VariantProps<typeof DeliveryStopoverListCardClass> {
  children?: React.ReactNode;
  className?: string;
}

const DeliveryStopoverListCard = ({
  background,
  border,
  height,
  children,
  className,
  ...props
}: DeliveryStopoverListCardProps) => {
  return (
    <>
      <div className={cn(DeliveryStopoverListCardClass({ background, border, height }))} {...props}>
        {children}
      </div>
    </>
  );
};

export default DeliveryStopoverListCard;

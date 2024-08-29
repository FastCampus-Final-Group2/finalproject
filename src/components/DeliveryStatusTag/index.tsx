import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { deliveryStatusClass } from "./index.variants";

interface DeliveryStatusTagProps extends VariantProps<typeof deliveryStatusClass> {
  children?: string;
}

const DeliveryStatusTag = ({ text, background, children, ...props }: DeliveryStatusTagProps) => {
  return (
    <>
      <div className={cn(deliveryStatusClass({ text, background }))} {...props}>
        {children}
      </div>
    </>
  );
};

export default DeliveryStatusTag;

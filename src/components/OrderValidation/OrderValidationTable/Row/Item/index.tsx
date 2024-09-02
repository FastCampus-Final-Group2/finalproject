import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";

interface ItemProps {
  value?: string | number;
  isError: boolean;
}

const Item = ({ value, isError }: ItemProps) => {
  return <div className={cn(itemVariants({ isError }))}>{value}</div>;
};

export default Item;

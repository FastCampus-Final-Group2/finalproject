import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";

interface ItemProps {
  value: string;
  isState: boolean;
}

const Item = ({ value, isState }: ItemProps) => {
  return (
    <div className={cn(itemVariants({ isState }))}>
      {isState || (
        <div className="border-r-transparent absolute left-0 top-0 h-0 w-0 border-[4.5px] border-solid border-b-blue-30 border-l-blue-100 border-t-blue-100" />
      )}
      {value}
    </div>
  );
};

export default Item;

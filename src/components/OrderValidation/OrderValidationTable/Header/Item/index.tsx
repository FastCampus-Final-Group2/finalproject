import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";

interface ItemProps {
  label: string;
  isState: boolean;
  isRequired: boolean;
}

const Item = ({ label, isState, isRequired }: ItemProps) => {
  return (
    <div className={cn(itemVariants({ isState, isAddress: label === "주소" || label === "상세주소" }))}>
      {isRequired && (
        <div className="absolute left-0 top-0 h-0 w-0 border-[4.5px] border-solid border-b-blue-30 border-l-blue-100 border-r-transparent border-t-blue-100" />
      )}
      {label}
    </div>
  );
};

export default Item;

import { cn } from "@/utils/cn";
import { rowVariants } from "./index.variants";

interface EmptyRowProps {
  isOdd: boolean;
}

const EmptyRow = ({ isOdd }: EmptyRowProps) => {
  return (
    <div className={cn(rowVariants({ isOdd }))}>
      <div className="h-[35px] w-[140px] flex-shrink-0 px-5">
        <div className="h-full w-full rounded-4 bg-blue-50" />
      </div>
    </div>
  );
};

export default EmptyRow;

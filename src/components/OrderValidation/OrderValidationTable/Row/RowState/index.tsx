import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import { rowStateVariants } from "./index.variants";

interface RowStateProps {
  isError: boolean;
}

const RowState = ({ isError }: RowStateProps) => {
  return (
    <div className="h-[35px] w-[140px] px-5">
      <div className={cn(rowStateVariants({ isError }))}>
        {isError ? (
          <>
            <Icon id="warning" size={18} className="text-white" />
            오류
          </>
        ) : (
          "완료"
        )}
      </div>
    </div>
  );
};

export default RowState;

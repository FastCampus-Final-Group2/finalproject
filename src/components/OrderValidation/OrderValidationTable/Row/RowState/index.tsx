import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import { rowStateVariants } from "./index.variants";
import { useRecoilValue } from "recoil";
import { isValidRowState } from "@/atoms/excelData";

interface RowStateProps {
  rowIndex: number;
}

const RowState = ({ rowIndex }: RowStateProps) => {
  const isValid = useRecoilValue(isValidRowState(rowIndex));

  return (
    <div className="h-[35px] w-[140px] flex-shrink-0 px-5">
      <div className={cn(rowStateVariants({ isValid }))}>
        {!isValid ? (
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

import type { ExcelDataHeader } from "@/types/excel";
import Item from "./Item";
import RowState from "./RowState";
import { cn } from "@/utils/cn";
import { rowVariants } from "./index.variants";
import { EXCEL_DATA_KEYS } from "@/components/OrderValidation/OrderValidationTable/index.constants";

interface OrderValidationTableRowProps {
  rowId: number;
  isOdd: boolean;
}

const OrderValidationTableRow = ({ rowId, isOdd }: OrderValidationTableRowProps) => {
  return (
    <div className={cn(rowVariants({ isOdd }))}>
      <RowState rowId={rowId} />
      {EXCEL_DATA_KEYS.map((key) => {
        return <Item key={key} header={key as ExcelDataHeader} rowId={rowId} />;
      })}
    </div>
  );
};

export default OrderValidationTableRow;

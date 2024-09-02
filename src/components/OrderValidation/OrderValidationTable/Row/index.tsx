import type { ExcelData } from "@/types/order";
import Item from "./Item";
import RowState from "./RowState";
import { cn } from "@/utils/cn";
import { rowVariants } from "./index.variants";

interface OrderValidationTableRowProps {
  order: ExcelData;
  isOdd: boolean;
}

const OrderValidationTableRow = ({ order, isOdd }: OrderValidationTableRowProps) => {
  return (
    <div className={cn(rowVariants({ isOdd }))}>
      <RowState isError={false} />
      {Object.keys(order).map((key) => {
        return <Item key={key} value={order[key]} isError={false} />;
      })}
    </div>
  );
};

export default OrderValidationTableRow;

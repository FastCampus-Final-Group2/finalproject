import { ORDER_VALIDATION_LIST_ROW_HEADERS } from "./index.constants";
import Item from "./Item";

const OrderValidationTableHeader = () => {
  return (
    <header className="flex h-[54px] w-max gap-4 rounded-4 bg-blue-30 px-4 py-[9px]">
      {ORDER_VALIDATION_LIST_ROW_HEADERS.map(({ label, isRequired }, index) => {
        return <Item key={label} label={label} isState={index === 0} isRequired={isRequired} />;
      })}
    </header>
  );
};

export default OrderValidationTableHeader;

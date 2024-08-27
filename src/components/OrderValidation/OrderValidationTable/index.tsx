import { ORDER_LIST } from "@/mocks/orderList";
import OrderValidationTableRow from "./Row";
import OrderValidationTabList from "./TabList";
import OrderValidationTableHeader from "./Header";
import OrderValidationButtons from "./Buttons";

const OrderValidationTable = () => {
  return (
    <>
      <OrderValidationTabList tabValue={{ total: 120, complete: 116, error: 4 }} />
      <OrderValidationButtons />
      <ul className="mx-2.5 flex w-full flex-col overflow-x-scroll">
        <OrderValidationTableHeader />
        {ORDER_LIST.map((order, index) => {
          return <OrderValidationTableRow key={index} order={order} isOdd={index % 2 === 0} />;
        })}
      </ul>
    </>
  );
};

export default OrderValidationTable;

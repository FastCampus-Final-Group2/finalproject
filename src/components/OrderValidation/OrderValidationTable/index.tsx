import { ORDER_LIST } from "@/mocks/orderList";
import OrderValidationTableRow from "./Row";
import OrderValidationTabList from "./TabList";
import OrderValidationTableHeader from "./Header";

const OrderValidationTable = () => {
  return (
    <div className="flex flex-col gap-12">
      <OrderValidationTabList tabValue={{ total: 120, complete: 116, error: 4 }} />
      <ul className="flex w-full flex-col overflow-x-scroll scrollbar-hide">
        <OrderValidationTableHeader />
        {ORDER_LIST.map((order, index) => {
          return <OrderValidationTableRow key={index} order={order} isOdd={index % 2 === 0} />;
        })}
      </ul>
    </div>
  );
};

export default OrderValidationTable;

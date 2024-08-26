import { ORDER_LIST } from "@/mocks/orderList";
import OrderValidationTableRow from "./Row";
import OrderValidationTabList from "./TabList";
import OrderValidationTableHeader from "./Header";
import OrderValidationInfo from "./Info";

const OrderValidationTable = () => {
  return (
    <>
      <OrderValidationTabList />
      <OrderValidationInfo totalNum={120} />
      <ul className="mx-2.5 flex flex-col overflow-scroll">
        <OrderValidationTableHeader />
        {ORDER_LIST.map((order, index) => {
          return <OrderValidationTableRow key={index} order={order} isOdd={index % 2 === 0} />;
        })}
      </ul>
    </>
  );
};

export default OrderValidationTable;

import OrderValidationHeader from "./OrderValidationHeader";
import OrderValidationTable from "./OrderValidationTable";

const OrderValidation = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-12 py-[54px]">
      <OrderValidationHeader />
      <OrderValidationTable />
    </div>
  );
};

export default OrderValidation;

import OrderValidationHeader from "./OrderValidationHeader";
import OrderValidationTable from "./OrderValidationTable";

const OrderValidation = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 px-12 py-[54px]">
      <OrderValidationHeader />
      <OrderValidationTable />
    </div>
  );
};

export default OrderValidation;

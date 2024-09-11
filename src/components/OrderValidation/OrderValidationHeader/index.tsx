import DispatchNameInput from "./DispatchNameInput";
import LoadingStartTimePicker from "./LoadingStartTimePicker";

const OrderValidationHeader = () => {
  return (
    <div className="flex w-full items-center gap-5">
      <h2 className="text-H-28-B">업로드 주문 목록</h2>
      <DispatchNameInput />
      <LoadingStartTimePicker />
    </div>
  );
};

export default OrderValidationHeader;

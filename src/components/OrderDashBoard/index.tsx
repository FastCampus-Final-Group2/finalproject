import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrder from "@/components/OrderDashBoard/PendingOrder";

const OrderDashBoard = () => {
  return (
    <div className="w-[524px] h-[884px] bg-[#F2F4FD] border">
      <div className="flex items-center justify-center w-[524px] h-[156px] border">
        <TotalOrder />
      </div> 
      <div className="flex justify-center w-[524px] h-[344px] border">
        <DriverList />
      </div>
      <div className="flex justify-center w-[524px] h-[64px] mt-[20px] border">
        <PendingOrder />
      </div>  
    </div>

  );
};

export default OrderDashBoard;
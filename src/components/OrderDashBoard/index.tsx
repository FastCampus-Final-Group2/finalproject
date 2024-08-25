import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";

const OrderDashBoard = () => {
  return (
    <div className="w-[524px] h-[884px] bg-[#F2F4FD] border">
      <div className="flex items-center justify-center w-[524px] h-[156px]">
        <TotalOrder totalOrders={76} errorOrders={8} estimatedTime={16} capacityRate={90}/>
      </div> 
      <div className="flex justify-center w-[524px] h-[344px]">
        <DriverList />
      </div>
      <div className="flex justify-center w-[524px] min-h-[64px] max-h-[364px] mt-[20px]">
        <PendingOrderList />
      </div>  
    </div>

  );
};

export default OrderDashBoard;
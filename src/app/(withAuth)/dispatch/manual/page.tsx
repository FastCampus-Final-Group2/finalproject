import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/core/NaverMap";

const page = () => {
  return (
    <>
      <DispatchInformationHeader />
      <div className="flex w-full">
        <OrderDashBoard />
        <div className="w-full">
          <NaverMap latitude={37.5665} longitude={126.978} />
        </div>
      </div>
    </>
  );
};

export default page;

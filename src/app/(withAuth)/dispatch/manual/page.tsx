import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/core/NaverMap";

const page = () => {
  const waypointGroups = [
    {
      id: 1,
      bgColor: "sky" as const,
      waypoints: [
        { lat: 37.5671, lng: 126.9743 },
        { lat: 37.5636, lng: 126.9822 },
        { lat: 37.5675, lng: 126.988 },
        { lat: 37.5625, lng: 126.982 },
        { lat: 37.5615, lng: 126.968 },
        { lat: 37.5575, lng: 126.978 },
      ],
    },
    {
      id: 2,
      bgColor: "olive" as const,
      waypoints: [
        { lat: 37.5675, lng: 126.962 },
        { lat: 37.5675, lng: 126.958 },
        { lat: 37.5651, lng: 126.9753 },
      ],
    },
    // 추가 그룹...
  ];
  return (
    <div className="w-full">
      <DispatchInformationHeader />
      <div className="flex w-full">
        <OrderDashBoard />
        <div className="w-full">
          <NaverMap waypointGroups={waypointGroups} />
        </div>
      </div>
    </div>
  );
};

export default page;

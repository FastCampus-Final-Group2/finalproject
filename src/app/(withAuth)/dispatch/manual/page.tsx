"use client";

import { useRecoilValue } from "recoil";
import { transportOrderState } from "@/atoms/transportOrder";
import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/core/NaverMap";

const Page = () => {
  const dispatchData = useRecoilValue(transportOrderState);

  const waypointGroups = [
    {
      id: 1,
      bgColor: "sky" as const,
      waypoints: [
        {
          lon: 127.17614453695751,
          lat: 36.32040839929852,
        },
        {
          lon: 127.1766276,
          lat: 36.3215926,
        },
        {
          lon: 127.1769758,
          lat: 36.3227361,
        },
        {
          lon: 127.1770629,
          lat: 36.3230639,
        },
        {
          lon: 127.1771367,
          lat: 36.3234191,
        },
        {
          lon: 127.1771783,
          lat: 36.3236677,
        },
        {
          lon: 127.1771764,
          lat: 36.3238217,
        },
        {
          lon: 127.1771367,
          lat: 36.324244,
        },
        {
          lon: 127.1768926,
          lat: 36.3256193,
        },
        {
          lon: 127.1768907,
          lat: 36.3257885,
        },
        {
          lon: 127.1769039,
          lat: 36.3259959,
        },
        {
          lon: 127.1769266,
          lat: 36.326124,
        },
        {
          lon: 127.1769899,
          lat: 36.3263705,
        },
        {
          lon: 127.1771253,
          lat: 36.3267277,
        },
        {
          lon: 127.177396,
          lat: 36.32733,
        },
        {
          lon: 127.1777494,
          lat: 36.3282119,
        },
        {
          lon: 127.1778236,
          lat: 36.3284597,
        },
        {
          lon: 127.1778303,
          lat: 36.3285547,
        },
        {
          lon: 127.1778227,
          lat: 36.3287726,
        },
        {
          lon: 127.1777593,
          lat: 36.3292315,
        },
        {
          lon: 127.1775962,
          lat: 36.3296962,
        },
        {
          lon: 127.1775158,
          lat: 36.3299965,
        },
        {
          lon: 127.1774782,
          lat: 36.3302934,
        },
        {
          lon: 127.1773133,
          lat: 36.3319141,
        },
      ],
    },
    {
      id: 2,
      bgColor: "olive" as const,
      waypoints: [
        { lat: 37.5675, lon: 126.962 },
        { lat: 37.5675, lon: 126.958 },
        { lat: 37.5651, lon: 126.9753 },
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
      {/* <pre>{JSON.stringify(dispatchData, null, 2)}</pre> */}
    </div>
  );
};

export default Page;

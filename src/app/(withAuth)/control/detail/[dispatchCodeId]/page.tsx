"use client";

import ControlDispatchHeader from "@/components/ControlDispatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMapForControlDetail from "@/components/NaverMapForControlDetail";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchListResponse } from "@/models/ApiTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Spinner from "@/components/core/Spinner";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

interface FetchData extends DispatchListResponse {
  orderType: string; // 이 줄을 추가
  dispatchList: {
    stopoverList: {
      lon: number;
      lat: number;
    }[];
    coordinates: {
      lat: number;
      lon: number;
    }[];
  }[];
}

const fetchDispatchCodeIdData = async (dispatchCodeId: number): Promise<FetchData> => {
  const response = await DispatchNumberApi.dispatchCodeIdVehicleControl(dispatchCodeId);
  if ("error" in response) {
    throw new Error("dispatchCodeID 데이터 불러오기 실패");
  }
  return response as FetchData;
};

const ColorTypes: ColorType[] = ["lime", "sky", "violet", "redwood", "peanut", "brown", "forest", "yale", "olive"];

const ControlDetailPage = ({ params }: { params: { dispatchCodeId: number } }) => {
  const { dispatchCodeId } = params;
  const [selectedDriverIndex, setSelectedDriverIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: fetchedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicle-control", dispatchCodeId],
    queryFn: () => fetchDispatchCodeIdData(dispatchCodeId),
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error) return <div>Error: {(error as Error).message}</div>;

  // console.log("대시보드 데이터", fetchedData);

  const waypointGroups =
    fetchedData?.dispatchList?.map((dispatch, index) => {
      return {
        id: index,
        bgColor: ColorTypes[index % ColorTypes.length],
        waypoints: [
          { lon: fetchedData?.startStopover?.lon ?? 0, lat: fetchedData?.startStopover?.lat ?? 0 },
          ...dispatch.coordinates,
        ],
      };
    }) ?? [];
  // console.log("waypointGroups", waypointGroups);

  const stopOverListPoint =
    fetchedData?.dispatchList?.map((dispatch, index) => {
      return {
        id: index,
        bgColor: ColorTypes[index % ColorTypes.length],
        waypoints: dispatch.stopoverList.map((stopover) => ({
          lon: stopover.lon,
          lat: stopover.lat,
        })),
      };
    }) ?? [];
  // console.log("stopOverListPoint", stopOverListPoint);

  return (
    <>
      <ControlDispatchHeader fetchedData={fetchedData!} />
      <div className="flex w-full">
        <ControlDispatchDashboard
          fetchedData={fetchedData!}
          refreshDashboardData={async () => {
            await refetch();
          }}
          refreshSideTabData={async () => {
            await refetch();
          }}
          onDriverSelect={setSelectedDriverIndex}
          // onModalOpen={handleModalOpen}
          // onModalClose={handleModalClose}
        />
        <NaverMapForControlDetail
          waypointGroups={waypointGroups}
          stopOverListPoint={stopOverListPoint}
          selectedDriverIndex={selectedDriverIndex}
          isModalOpen={isModalOpen}
        />
      </div>
    </>
  );
};

export default ControlDetailPage;

"use client";

import ControlDispatchHeader from "@/components/ControlDispatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMap from "@/components/core/NaverMap";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchListResponse } from "@/models/ApiTypes";
import { useQuery } from "@tanstack/react-query";

interface FetchData extends DispatchListResponse {
  dispatchList: {
    coordinates: {
      lat: number;
      lng: number;
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

const ControlDetailPage = ({ params }: { params: { dispatchCodeId: number } }) => {
  const { dispatchCodeId } = params;

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

  // refreshData 함수 제거
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  console.log("fetchedData in control detail page", fetchedData);
  const waypointGroups =
    fetchedData?.dispatchList?.map((dispatch) => {
      return [
        { lat: fetchedData?.startStopover?.lat ?? 0, lng: fetchedData?.startStopover?.lon ?? 0 },
        ...dispatch.coordinates,
      ];
    }) ?? [];

  console.log("waypointGroups", waypointGroups);
  return (
    <>
      <ControlDispatchHeader fetchedData={fetchedData!} />
      <div className="flex w-full">
        <ControlDispatchDashboard
          fetchedData={fetchedData!}
          refreshData={async () => {
            await refetch();
          }}
        />
        <div className="w-full">{/* <NaverMap waypointGroups={waypointGroups} /> */}</div>
      </div>
    </>
  );
};

export default ControlDetailPage;

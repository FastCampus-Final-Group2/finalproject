"use client";

import ControlDispatchHeader from "@/components/ControlDispatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMap from "@/components/core/NaverMap";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchListResponse } from "@/models/ApiTypes";
import { useQuery } from "@tanstack/react-query";

const fetchDispatchCodeIdData = async (dispatchCodeId: number): Promise<DispatchListResponse> => {
  const data = await DispatchNumberApi.dispatchCodeIdVehicleControl(dispatchCodeId);
  if (data.error) {
    throw new Error("dispatchCodeID 데이터 불러오기 실패");
  }
  return data as DispatchListResponse;
};

const ControlDetailPage = ({ params }: { params: { dispatchCodeId: number } }) => {
  const { dispatchCodeId } = params;

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicle-control", dispatchCodeId],
    queryFn: () => fetchDispatchCodeIdData(dispatchCodeId),
    retry: 3,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  // console.log("fetchedData", fetchedData);

  return (
    <>
      <ControlDispatchHeader fetchedData={fetchedData!} />
      <div className="flex w-full">
        <ControlDispatchDashboard fetchedData={fetchedData!} />
        <div className="w-full">
          <NaverMap
            latitude={fetchedData?.dispatchList?.[0]?.coordinates?.[0]?.lat ?? 0}
            longitude={fetchedData?.dispatchList?.[0]?.coordinates?.[0]?.lon ?? 0}
          />
        </div>
      </div>
    </>
  );
};

export default ControlDetailPage;

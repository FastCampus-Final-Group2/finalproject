"use client";

import { useRecoilValue } from "recoil";
import { driverNumSelector, selectedDriverState } from "@/atoms/dispatchData";
import Polyline from "@/components/NaverMap/DispatchPath/Polyline";
import Markers from "@/components/NaverMap/DispatchPath/Markers";
import PendingMarkers from "./PendingMarkers";
import { Fragment } from "react";

interface DispatchPathProps {
  map: naver.maps.Map;
}

const DispatchPath = ({ map }: DispatchPathProps) => {
  const driverNum = useRecoilValue(driverNumSelector);
  const selectedDriver = useRecoilValue(selectedDriverState);

  return (
    <>
      {selectedDriver === -1 ? (
        Array.from({ length: driverNum }).map((_, index) => {
          return (
            <Fragment key={`dispatchPath-${index}`}>
              <Polyline map={map} index={index} />
              <Markers map={map} index={index} />
            </Fragment>
          );
        })
      ) : (
        <>
          <Polyline key={`selectedPolyline-${selectedDriver}`} map={map} index={selectedDriver} />
          <Markers key={`selectedMarkers-${selectedDriver}`} map={map} index={selectedDriver} />
        </>
      )}
      <PendingMarkers map={map} />
    </>
  );
};

export default DispatchPath;

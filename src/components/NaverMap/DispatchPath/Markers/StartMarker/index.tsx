"use client";

import ReactDOMServer from "react-dom/server";
import { selectedDriverState, startStopoverResponseSelector } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import MarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon";

interface StartMarkerProps {
  map: naver.maps.Map;
  index: number;
}

const StartMarker = ({ map, index }: StartMarkerProps) => {
  const startStopover = useRecoilValue(startStopoverResponseSelector);
  const selectedDriver = useRecoilValue(selectedDriverState);

  useEffect(() => {
    if (!startStopover) return;

    const markerOptions = {
      position: new window.naver.maps.LatLng(startStopover.lat, startStopover.lon),
      map: map,
      icon: {
        content: ReactDOMServer.renderToString(
          <MarkerIcon
            index={index}
            type="start"
            coordinateIndex={0}
            startDetail={startStopover}
            isSelected={selectedDriver !== -1}
          />,
        ),
        size: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(25, 50),
      },
      title: `Group ${index + 1} - Waypoint 0`,
    };

    const marker = new window.naver.maps.Marker(markerOptions);

    return () => {
      marker.setMap(null);
    };
  }, [index, map, selectedDriver, startStopover]);

  return <></>;
};

export default StartMarker;

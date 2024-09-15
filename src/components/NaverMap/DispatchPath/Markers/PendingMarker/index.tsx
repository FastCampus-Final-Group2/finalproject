"use client";

import ReactDOMServer from "react-dom/server";
import { pendingOrderDataState } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import MarkerIcon from "../MarkerIcon";

interface PendingMarkerProps {
  map: naver.maps.Map;
}

const PendingMarker = ({ map }: PendingMarkerProps) => {
  const pendingOrderList = useRecoilValue(pendingOrderDataState);

  useEffect(() => {
    pendingOrderList.forEach((pendingOrder, coordinateIndex) => {
      const markerOptions = {
        position: new window.naver.maps.LatLng(pendingOrder.lat, pendingOrder.lon),
        map: map,
        icon: {
          content: ReactDOMServer.renderToString(
            <MarkerIcon
              index={coordinateIndex}
              type="pending"
              coordinateIndex={coordinateIndex}
              courseDetail={pendingOrder}
            />,
          ),
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 50),
        },
        title: `Group Pending - Waypoint ${String.fromCharCode(65 + coordinateIndex)}`,
      };
      console.log(pendingOrder);
      const marker = new window.naver.maps.Marker(markerOptions);
    });
  }, [map, pendingOrderDataState]);

  return <></>;
};

export default PendingMarker;

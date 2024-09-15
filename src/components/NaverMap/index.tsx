"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import DispatchPath from "./DispatchPath";

const NaverMap = () => {
  const [map, setMap] = useState<naver.maps.Map | undefined>(undefined);

  const mapElement = useRef<HTMLDivElement>(null);

  const loadNaverMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(36.5, 127.5),
      zoom: 8,
      zoomControl: true,
    };

    const map = new window.naver.maps.Map(mapElement.current as HTMLElement, mapOptions);

    setMap(map);
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_Client_ID}`}
        onReady={loadNaverMap}
      />
      <div ref={mapElement} id="map" className="h-[884px] w-full" />
      {map && (
        <>
          <DispatchPath map={map} />
        </>
      )}
    </>
  );
};

export default NaverMap;

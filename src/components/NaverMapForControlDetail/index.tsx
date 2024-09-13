"use client";

import ReactDOMServer from "react-dom/server";
import { useEffect, useRef } from "react";
import StartMarkerIcon from "@/components/core/Icon/StartMarkerIcon";
import EndMarkerIcon from "@/components/core/Icon/EndMarkerIcon";
import TransitMarkerIcon from "@/components/core/Icon/TransitMarkerIcon";

// 색상 매핑 객체
const BG_COLOR_MAP = {
  lime: "#3F9122",
  sky: "#237B8F",
  purple: "#3F238F",
  violet: "#8F2377",
  redwood: "#8F3623",
  peanut: "#8F6A23",
  brown: "#805332",
  forest: "#417245",
  yale: "#2F5683",
  olive: "#768131",
} as const;

interface Waypoint {
  lat: number;
  lon: number;
}

interface WaypointGroup {
  id: number;
  bgColor: keyof typeof BG_COLOR_MAP;
  waypoints: Waypoint[];
}

const NaverMap = ({ waypointGroups }: { waypointGroups: WaypointGroup[] }) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById("naver-map-script");

        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "naver-map-script";
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_Client_ID}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);

        document.head.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        const mapOptions = {
          center: new window.naver.maps.LatLng(waypointGroups[0].waypoints[0].lat, waypointGroups[0].waypoints[0].lon),
          zoom: 14,
          zoomControl: true,
        };

        const map = new window.naver.maps.Map(mapElement.current as HTMLElement, mapOptions);

        waypointGroups.forEach((group, groupIndex) => {
          group.waypoints.forEach((waypoint, index) => {
            let markerOptions;

            if (index === 0) {
              markerOptions = {
                position: new window.naver.maps.LatLng(waypoint.lat, waypoint.lon),
                map: map,
                icon: {
                  content: ReactDOMServer.renderToString(<StartMarkerIcon color={BG_COLOR_MAP[group.bgColor]} />),
                  size: new naver.maps.Size(50, 50),
                  anchor: new naver.maps.Point(20, 30),
                },
                title: `Group ${groupIndex + 1} - Waypoint ${index + 1}`,
              };
            } else if (index === group.waypoints.length - 1) {
              markerOptions = {
                position: new window.naver.maps.LatLng(waypoint.lat, waypoint.lon),
                map: map,
                icon: {
                  content: ReactDOMServer.renderToString(<EndMarkerIcon color={BG_COLOR_MAP[group.bgColor]} />),
                  size: new naver.maps.Size(50, 50),
                  anchor: new naver.maps.Point(20, 30),
                },
                title: `Group ${groupIndex + 1} - Waypoint ${index + 1}`,
              };
            } else {
              // TransitMarkerIcon을 사용하여 중간 경유지 아이콘을 렌더링
              markerOptions = {
                position: new window.naver.maps.LatLng(waypoint.lat, waypoint.lon),
                map: map,
                icon: {
                  content: ReactDOMServer.renderToString(
                    <TransitMarkerIcon color={BG_COLOR_MAP[group.bgColor]} index={index} />,
                  ),
                  size: new naver.maps.Size(50, 50),
                  anchor: new naver.maps.Point(25, 50), // 앵커 포인트 조정
                },
                title: `Group ${groupIndex + 1} - Waypoint ${index + 1}`,
              };
            }

            const marker = new window.naver.maps.Marker(markerOptions);
          });

          // Polyline을 추가하여 경유지 간의 경로를 표시
          const polyline = new window.naver.maps.Polyline({
            path: group.waypoints.map((wp) => new window.naver.maps.LatLng(wp.lat, wp.lon)),
            map: map,
            strokeColor: BG_COLOR_MAP[group.bgColor], // 그룹별 bgColor 적용
            strokeWeight: 4, // 선 두께
            strokeStyle: "solid", // 선 스타일
          });
        });
      })
      .catch((err) => {
        console.error("네이버 지도 API를 불러오는 중 오류가 발생했습니다:", err);
      });
  }, [waypointGroups]); // waypointGroups가 변경될 때마다 재실행

  return <div ref={mapElement} id="map" className="h-[884px] w-full" />;
};

export default NaverMap;

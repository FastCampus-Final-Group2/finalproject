// "use client";

// import { useEffect } from "react";

// // 네이버 지도 API를 로드하고 지도 설정
// const NaverMap = ({ lat = 37.5665, lng = 126.978, zoom = 15 }) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_Client_ID}`;
//     script.async = true;
//     script.onload = () => initializeMap();
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [lat, lng]);

//   const initializeMap = () => {
//     const map = new window.naver.maps.Map("map", {
//       center: new window.naver.maps.LatLng(lat, lng),
//       zoom: zoom,
//     });

//     new window.naver.maps.Marker({
//       position: new window.naver.maps.LatLng(lat, lng),
//       map: map,
//     });
//   };

//   return (
//     <div>
//       <div id="map" style={{ width: "100%", height: "884px" }} />
//     </div>
//   );
// };

// export default NaverMap;
"use client";

import { useState, useEffect } from "react";

let mapInstance: naver.maps.Map | null = null;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

const NaverMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  // 지도 로딩 상태
  const [isMapLoaded, setMapLoaded] = useState(false);

  const initMap = () => {
    // 추가 옵션 설정
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    };

    // 지도 초기화 확인
    if (document.getElementById("map")) {
      mapInstance = new naver.maps.Map("map", mapOptions);
    }

    // Marker 생성
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: mapInstance,
    });

    // Marker 클릭 시 지도 초기화
    naver.maps.Event.addListener(marker, "click", () => {
      mapInstance?.setCenter(new naver.maps.LatLng(latitude, longitude));
      mapInstance?.setZoom(16);
    });

    // 지도 로드 완료
    setMapLoaded(true);
  };

  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === "undefined") {
      loadScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_Client_ID}`,
        initMap,
      );
    } else {
      initMap();
    }
  }, [latitude, longitude]);

  return (
    <>
      {/* 위치 정보(지도) */}
      <div className="h-[884px] w-full">{isMapLoaded && <div id="map" className="h-full w-11/12" />}</div>
    </>
  );
};

export default NaverMap;

"use client";

import ReactDOMServer from "react-dom/server";
import { isClickPendingOrderListState, pendingOrderDataState, selectedPendingState } from "@/atoms/dispatchData";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PendingMarker from "./PendingMarker";
import { TransportOrderResponse } from "@/models/ApiTypes";
import OrderModal from "@/components/detailModal/OrderModal";
import { formatOrder } from "@/utils/format/formatOrder";

interface PendingMarkersProps {
  map: naver.maps.Map;
}

const PendingMarkers = ({ map }: PendingMarkersProps) => {
  const pendingOrderList = useRecoilValue(pendingOrderDataState);
  const [selectedPending, setSelectedPending] = useRecoilState(selectedPendingState);
  const [isClickPendingOrderList, setIsClickPendingOrderList] = useRecoilState(isClickPendingOrderListState);
  const [modalInfo, setModalInfo] = useState<TransportOrderResponse>({});

  useEffect(() => {
    const markers: naver.maps.Marker[] = [];

    pendingOrderList.forEach((pendingOrder, pendingIndex) => {
      const markerOptions = {
        position: new window.naver.maps.LatLng(pendingOrder.lat, pendingOrder.lon),
        map: map,
        icon: {
          content: ReactDOMServer.renderToString(
            <PendingMarker
              pendingIndex={pendingIndex}
              pendingOrder={pendingOrder}
              isSelected={selectedPending === pendingIndex}
            />,
          ),
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 50),
        },
      };

      const marker = new window.naver.maps.Marker(markerOptions);

      marker
        .getElement()
        .querySelector(`#modalbtn-${pendingIndex}`)
        ?.addEventListener("click", (event) => {
          event.stopPropagation();

          setModalInfo(formatOrder(pendingOrder));
        });

      marker
        .getElement()
        .querySelector(`#pendingIcon-${pendingIndex}`)
        ?.addEventListener("click", (event) => {
          event.stopPropagation();

          setIsClickPendingOrderList(false);

          if (pendingIndex === selectedPending) {
            setSelectedPending(-1);
          } else {
            setSelectedPending(pendingIndex);
          }
        });

      markers.push(marker);
    });

    if (isClickPendingOrderList && selectedPending !== -1) {
      map.panTo(
        new window.naver.maps.LatLng(pendingOrderList[selectedPending].lat, pendingOrderList[selectedPending].lon),
      );
      setIsClickPendingOrderList(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (selectedPending === -1) return;

      if (!markers[selectedPending].getElement().contains(event.target as Node)) {
        setSelectedPending(-1);
        setIsClickPendingOrderList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });

      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClickPendingOrderList, map, pendingOrderList, selectedPending, setIsClickPendingOrderList, setSelectedPending]);

  return (
    <>
      {Object.keys(modalInfo).length !== 0 && (
        <OrderModal id={-1} orderInfo={modalInfo} onClose={() => setModalInfo({})} />
      )}
    </>
  );
};

export default PendingMarkers;

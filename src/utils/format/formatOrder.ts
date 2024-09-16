import { CourseDetailResponse, LocalTime, TransportOrderResponse } from "@/models/ApiTypes";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatOrder = (pendingOrder: CourseDetailResponse): TransportOrderResponse => {
  const estimatedWorkTime =
    pendingOrder.expectationOperationEndTime &&
    pendingOrder.expectationOperationStartTime &&
    dayjs
      .duration(dayjs(pendingOrder.expectationOperationEndTime).diff(dayjs(pendingOrder.expectationOperationStartTime)))
      .format("HH:mm:ss");

  const DestinationInfo =
    pendingOrder.deliveryDestinationId !== 0
      ? {
          managerName: pendingOrder.managerName,
          phoneNumber: pendingOrder.phoneNumber,
          deliveryDestinationCode: pendingOrder.deliveryDestinationId,
        }
      : undefined;

  const ClientInfo =
    pendingOrder.deliveryDestinationId === 0
      ? {
          clientName: pendingOrder.clientName,
          phoneNumber: pendingOrder.contact,
          roadAddress: pendingOrder.roadAddress,
          detailAddress: pendingOrder.detailAddress,
          note: pendingOrder.note,
        }
      : undefined;

  return {
    deliveryType: pendingOrder.deliveryType,
    smName: pendingOrder.smName,
    shipmentNumber: pendingOrder.shipmentNumber,
    orderType: pendingOrder.orderType,
    requestedWorkDate: pendingOrder.serviceRequestDate,
    orderDate: pendingOrder.receivedDate,
    requestedArrivalTime: pendingOrder.serviceRequestTime,
    estimatedWorkTime: estimatedWorkTime as LocalTime | undefined,
    productName: pendingOrder.productName,
    productCount: pendingOrder.productQuantity,
    volume: pendingOrder.volume,
    weight: pendingOrder.weight,
    destinationInfo: DestinationInfo,
    clientInfo: ClientInfo,
  };
};

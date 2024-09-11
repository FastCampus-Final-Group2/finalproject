
import dispatchIdVehicleControl from "./dispatchIdvehicleControl"
import orderCancel from "./orderCancel"



export const DispatchDetailApi = {
  orderCancel: orderCancel,
  dispatchIdVehicleControl: dispatchIdVehicleControl,
}


// 차량관제 배차 상세 확인(GET)(/control/detail/[dispatchCodeId])
// /api/dispatch-detail/{dispatchId}/vehicle-control
// 차량관제 상새의 배송주문 취소(PATCH)(/control/detail/[dispatchCodeId])
// /api/dispatch-detail/vehicle-control 
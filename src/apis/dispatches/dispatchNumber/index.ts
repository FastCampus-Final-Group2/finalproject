// TODO: 차량관제/배차조회 및 검색(GET)(/control)
// /api/dispatch-number?status=“”&isManager=boolean&startDate=””&endDate=””&searchOption=””&searchKeyword=””
// TODO: 차량관제 배차 번호내 배차 전체 확인(GET)(/control/detail/[dispatchCodeId])
// /api/dispatch-number/{dispatchCodeId}/vehicle-control 

import search from "./search";
import vehicleControlDispatchCodeId from "./vehicleControlDispatchCodeId";

export const DispatchNumberApi = {
  search: search,
  vehicleControlDispatchCodeId: vehicleControlDispatchCodeId,
}
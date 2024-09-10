
import dispatchCancel from "./dispatchCancel";
import issue from "./issue";

export const dispatchApi = {
  dispatchCancel: dispatchCancel,
  issue: issue,
}

// 배차 강제 종료(PATCH)(/control)
// /api/dispatch
// 배차 이슈 등록(POST)(/control/detail/[dispatchCodeId])
// /api/dispatch/{dispatchId}/issue 
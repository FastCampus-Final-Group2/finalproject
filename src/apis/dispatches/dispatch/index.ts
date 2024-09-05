
import dispatchCancel from "./dispatchCancel";
import issues from "./issues";

export const dispatchApi = {
  dispatchCancel: dispatchCancel,
  issues: issues,
}

// 배차 강제 종료(PATCH)(/control)
// /api/dispatch
// 배차 이슈 등록(POST)(/control/detail/[dispatchCodeId])
// /api/dispatch/{dispatchId}/issue 
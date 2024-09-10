export const USERS_API_PATH = {
  login: "/users/login",
  logout: "/users/logout",
} as const;

export const TRANSPORT_ORDER_API_PATH = {
  excelExample: "/transport-order/excel-example",
  valid: "/transport-order/valid",
  postOrder: "/transport-order",
  detail: "/transport-order",
} as const;

export const CENTER_API_PATH = {
  getDetailInfo: "/center",
  updateDetailInfo: "/center",
} as const;

export const DESTINATION_API_PATH = {
  getDetailInfo: "/delivery-destination",
  updateDetailInfo: "/delivery-destination",
} as const;

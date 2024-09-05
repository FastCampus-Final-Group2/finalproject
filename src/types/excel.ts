export type ExcelDataHeader =
  | "deliveryType" // 필수
  | "smName" // 필수
  | "shipmentNumber" // 필수
  | "clientOrderKey"
  | "orderType" // 필수
  | "receivedDate" // 필수
  | "serviceRequestDate" // 필수
  | "serviceRequestTime" // 필수
  | "clientName" // 필수
  | "contact" // 필수
  | "address" // 필수
  | "detailAddress" // 필수
  | "zipcode" // 필수
  | "volume" // 필수
  | "weight" // 필수
  | "note"
  | "expectedServiceDuration"
  | "productName" // 필수
  | "productCode"
  | "productQuantity"; // 필수

export type ExcelData = {
  [key in Exclude<ExcelDataHeader, "smName">]: { value: string; isValid: boolean };
} & {
  rowId: number;
  smName: {
    id: number;
    value: string;
    isValid: boolean;
  };
};

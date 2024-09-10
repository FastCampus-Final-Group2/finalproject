import { ValidList } from "@/models/ApiTypes";

export interface SmInfos {
  [key: string]: ValidList;
}

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

export interface DefaultExcelDataValue {
  value: string;
  isValid: boolean;
}

export interface SmNameExcelDataValue {
  id: number;
  value: string;
  isValid: boolean;
}

export type ExcelData = {
  [key in Exclude<ExcelDataHeader, "smName">]: DefaultExcelDataValue;
} & {
  rowId: number;
  smName: SmNameExcelDataValue;
};

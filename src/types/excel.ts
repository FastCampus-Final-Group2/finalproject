import { ValidList } from "@/models/ApiTypes";

export interface SmInfos {
  [key: string]: ValidList;
}

export type ExcelDataHeader =
  | "deliveryType" // 필수
  | "smName" // 필수
  | "clientName" // 필수
  | "address" // 필수
  | "shipmentNumber" // 필수
  | "clientOrderKey" // 선택
  | "orderType" // 필수
  | "receivedDate" // 필수
  | "serviceRequestDate" // 필수
  | "serviceRequestTime" // 선택
  | "contact" // 필수
  | "detailAddress" // 선택
  | "zipcode" // 필수
  | "volume" // 필수
  | "weight" // 필수
  | "note" // 선택
  | "expectedServiceDuration" // 선택: 1
  | "productName" // 선택
  | "productCode" // 선택
  | "productQuantity"; // 선택: 1

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

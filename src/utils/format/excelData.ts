import { ExcelData, SmInfos } from "@/types/excel";
import { OrderValidationFunc } from "@/utils/validation/order";

export const formatExcelDataRow = (row: string[], rowId: number, smInfos: SmInfos): ExcelData => {
  return {
    rowId: rowId,
    deliveryType: {
      value: row[0],
      isValid: OrderValidationFunc.deliveryType(row[0]),
    },
    smName: {
      value: row[1],
      ...OrderValidationFunc.smName(row[1], smInfos),
    },
    clientName: {
      value: row[2],
      isValid: OrderValidationFunc.clientName(row[2]),
    },
    address: {
      value: row[3],
      isValid: OrderValidationFunc.address(row[3]),
    },
    shipmentNumber: {
      value: row[4],
      isValid: OrderValidationFunc.shipmentNumber(row[4]),
    },
    clientOrderKey: {
      value: row[5],
      isValid: OrderValidationFunc.clientOrderKey(row[5]),
    },
    orderType: {
      value: row[6],
      isValid: OrderValidationFunc.orderType(row[6]),
    },
    receivedDate: {
      value: String(row[7]),
      isValid: OrderValidationFunc.receivedDate(String(row[7])),
    },
    serviceRequestDate: {
      value: String(row[8]),
      isValid: OrderValidationFunc.serviceRequestDate(String(row[8])),
    },
    serviceRequestTime: {
      value: row[9],
      isValid: OrderValidationFunc.serviceRequestTime(row[9]),
    },
    contact: {
      value: String(row[10]).charAt(0) === "0" ? String(row[10]) : "0" + String(row[10]),
      isValid: OrderValidationFunc.contact(String(row[10]).charAt(0) === "0" ? String(row[10]) : "0" + String(row[10])),
    },
    detailAddress: {
      value: row[11],
      isValid: OrderValidationFunc.detailAddress(row[11]),
    },
    zipcode: {
      value: String(row[12]).padStart(5, "0"),
      isValid: OrderValidationFunc.zipcode(String(row[12]).padStart(5, "0")),
    },
    volume: {
      value: String(row[13]),
      isValid: OrderValidationFunc.volume(String(row[13])),
    },
    weight: {
      value: String(row[14]),
      isValid: OrderValidationFunc.weight(String(row[14])),
    },
    note: {
      value: row[15],
      isValid: OrderValidationFunc.note(row[15]),
    },
    expectedServiceDuration: {
      value: row[16],
      isValid: OrderValidationFunc.expectedServiceDuration(String(row[16])),
    },
    productName: {
      value: row[17],
      isValid: OrderValidationFunc.productName(row[17]),
    },
    productCode: {
      value: row[18],
      isValid: OrderValidationFunc.productCode(row[18]),
    },
    productQuantity: {
      value: row[19],
      isValid: OrderValidationFunc.productQuantity(String(row[19])),
    },
  };
};

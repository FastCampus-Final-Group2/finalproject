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
    shipmentNumber: {
      value: row[2],
      isValid: OrderValidationFunc.shipmentNumber(row[2]),
    },
    clientOrderKey: {
      value: row[3],
      isValid: OrderValidationFunc.clientOrderKey(row[3]),
    },
    orderType: {
      value: row[4],
      isValid: OrderValidationFunc.orderType(row[4]),
    },
    receivedDate: {
      value: String(row[5]),
      isValid: OrderValidationFunc.receivedDate(String(row[5])),
    },
    serviceRequestDate: {
      value: String(row[6]),
      isValid: OrderValidationFunc.serviceRequestDate(String(row[6])),
    },
    serviceRequestTime: {
      value: row[7],
      isValid: OrderValidationFunc.serviceRequestTime(row[7]),
    },
    clientName: {
      value: row[8],
      isValid: OrderValidationFunc.clientName(row[8]),
    },
    contact: {
      value: String(row[9]).charAt(0) === "0" ? String(row[9]) : "0" + String(row[9]),
      isValid: OrderValidationFunc.contact(String(row[9]).charAt(0) === "0" ? String(row[9]) : "0" + String(row[9])),
    },
    address: {
      value: row[10],
      isValid: OrderValidationFunc.address(row[10]),
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
      value: row[16] ? String(row[16]) : "1",
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
      value: row[19] ? String(row[19]) : "1",
      isValid: OrderValidationFunc.productQuantity(String(row[19])),
    },
  };
};

import { ExcelData } from "@/types/excel";
import { OrderValidationFunc } from "./order";

export const validExcelData = (row: string[], rowId: number): ExcelData => {
  return {
    rowId: rowId,
    deliveryType: {
      value: row[0],
      isValid: OrderValidationFunc.deliveryType(row[0]),
    },
    smName: {
      value: row[1],
      ...OrderValidationFunc.smName(row[1]),
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
      value: row[5],
      isValid: OrderValidationFunc.receivedDate(row[5]),
    },
    serviceRequestDate: {
      value: row[6],
      isValid: OrderValidationFunc.serviceRequestDate(row[6]),
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
      value: row[9],
      isValid: OrderValidationFunc.contact(row[9]),
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
      value: row[12],
      isValid: OrderValidationFunc.zipcode(row[12]),
    },
    volume: {
      value: row[13],
      isValid: OrderValidationFunc.volume(row[13]),
    },
    weight: {
      value: row[14],
      isValid: OrderValidationFunc.weight(row[14]),
    },
    note: {
      value: row[15],
      isValid: OrderValidationFunc.note(row[15]),
    },
    expectedServiceDuration: {
      value: row[16] ? row[16] : "1",
      isValid: OrderValidationFunc.expectedServiceDuration(row[16]),
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
      value: row[19] ? row[19] : "1",
      isValid: OrderValidationFunc.productQuantity(row[19]),
    },
  };
};

import { ExcelData } from "@/types/excel";
import dayjs from "dayjs";
import { formatPhoneNumber } from "./phoneNumber";

export const formatTransportOrderRequest = (loadingStartTime: string, dispatchName: string, excelData: ExcelData[]) => {
  return {
    loadingStartTime: dayjs(loadingStartTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DDTHH:mm:00"),
    dispatchName: dispatchName,
    orderReuquestList: excelData.map(({ rowId, smName, ...rest }) => {
      return {
        ...Object.fromEntries(
          Object.entries(rest).map(([key, { value }]) => {
            if (key === "receivedDate" || key === "serviceRequestDate") {
              return [key, dayjs(value, "YYYYMMDD").format("YYYY-MM-DD")];
            }

            if (["volume", "weight"].includes(key)) {
              return [key, Number(value)];
            }

            if (key === "contact") {
              return [key, formatPhoneNumber(value)];
            }

            if (key === "expectedServiceDuration" || key === "productQuantity") {
              if (!value || value === "0") return [key, 1];
              else return [key, value];
            }

            return [key, value];
          }),
        ),
        smName: smName.value,
        smId: smName.id,
      };
    }),
  };
};

import { ExcelData } from "@/types/excel";
import dayjs from "dayjs";

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
              if (value.length === 9) {
                return [key, value.replace(/^(\d{2})(\d{3})(\d{4})$/, "$1-$2-$3")];
              } else if (value.length === 10) {
                return [key, value.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3")];
              } else if (value.length === 11) {
                return [key, value.replace(/^(\d{2,3})(\d{4})(\d{4})$/, "$1-$2-$3")];
              }
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

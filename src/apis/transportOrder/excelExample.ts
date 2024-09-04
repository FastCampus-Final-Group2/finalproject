"use server";

import { DownloadOrderFormExcelData } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { TRANSPORT_ORDER_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const excelExample = async () => {
  return toAxios<DownloadOrderFormExcelData>(
    axios.get<DownloadOrderFormExcelData>(TRANSPORT_ORDER_API_PATH.excelExample, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    }),
  );
};

export default excelExample;

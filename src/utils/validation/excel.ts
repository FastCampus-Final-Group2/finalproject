import { ExcelData } from "@/types/excel";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import getSmInfos from "@/utils/getSmInfos";
import { formatExcelDataRow } from "@/utils/format/excelData";

const EXCEL_HEADERS = [
  "배송유형 (지입/용차/택배)",
  "SM명",
  "운송장번호",
  "업체주문번호",
  "주문유형",
  "주문접수일",
  "작업희망일",
  "희망도착시간",
  "고객명",
  "고객연락처",
  "주소",
  "상세주소",
  "우편번호",
  "볼륨",
  "중량",
  "고객전달사항",
  "예상작업시간",
  "상품명",
  "상품 코드",
  "상품 수량",
];

export const isExcelHeaderCorrect = (row: string[]) => {
  return row.every((header, index) => {
    return header === EXCEL_HEADERS[index];
  });
};

export const isExcelDataEmpty = (excelData: string[][]) => {
  return !excelData.some((row, index) => {
    if (index < 4) return true;
    return row.length > 0;
  });
};

export const handleExcelFile = async (arrayBuffer: ArrayBuffer) => {
  const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const excelData = (XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }) as unknown[][])
    .filter((row) => row.some((cell) => cell !== ""))
    .map((row) =>
      row.map((cell) => {
        if (cell instanceof Date) {
          return dayjs(cell).format("HH:mm");
        }

        return cell;
      }),
    )
    .map((row) => {
      return row.slice(0, 20);
    }) as string[][];

  if (!isExcelHeaderCorrect(excelData[0]) || isExcelDataEmpty(excelData)) {
    return null;
  }

  const [error, smInfos] = await getSmInfos(excelData.slice(4));

  if (error) {
    return null;
  }

  const validedExcelData: ExcelData[] = excelData.slice(4).map((row, index) => {
    return formatExcelDataRow(row, index, smInfos);
  });

  return validedExcelData;
};

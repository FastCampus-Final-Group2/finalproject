import { ExcelData } from "@/types/excel";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import getSmInfos from "@/utils/getSmInfos";
import { formatExcelDataRow } from "@/utils/format/excelData";
import { EXCEL_HEADERS } from "@/constants/excel";
import { Error } from "@/utils/toAxios";

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

export const handleExcelFile = async (
  arrayBuffer: ArrayBuffer,
): Promise<
  | [
      (
        | Error
        | {
            type: string;
            status: null;
            data: null;
          }
      ),
      null,
    ]
  | [null, ExcelData[]]
> => {
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
    return [
      {
        type: "EXAMPLE_ERROR",
        status: null,
        data: null,
      },
      null,
    ];
  }

  const [error, smInfos] = await getSmInfos(excelData.slice(4));

  if (error) {
    return [error, null];
  }

  const validedExcelData: ExcelData[] = excelData.slice(4).map((row, index) => {
    return formatExcelDataRow(row, index, smInfos);
  });

  return [null, validedExcelData];
};

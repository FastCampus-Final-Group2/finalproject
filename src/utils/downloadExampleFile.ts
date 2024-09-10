import * as XLSX from "xlsx";

// const EXCEL_HEADER_INFOS = [
//   ["배송유형 (지입/용차/택배)", "필수", "배송유형은 지입/용차/택배로 구분하여 입력해주세요.", "예시) 지입"],
//   [
//     "SM명",
//     "필수",
//     "특정 주문을 작업할 담당 드라이버를 지정해주세요.\nGLT 코리아에 등록되지 않은 드라이버의 이름을 입력하면 오류가 발생합니다.",
//     "예시) 이서원",
//   ],
//   ["운송장번호", "필수", "주문번호에 할당된 운송장번호를 입력해주세요.", "예시) C0029384889"],
//   [
//     "업체주문번호",
//     "선택",
//     "운송장 번호가 할당된 주문번호를 입력해주세요.\n관리의 편리함을 위해 있는 입력칸으로,\n필수값이 아니며 임의로 작성해주셔도 됩니다.",
//     "예시) 240812_공동구매",
//   ],
//   ["주문유형", "선택", "배송/수거", "예시) 수거"],
//   [
//     "주문접수일",
//     "필수",
//     "주문이 귀사에 접수된 날짜를 양식에 맞게 입력해주세요.\n미래의 날짜는 입력할 수 없습니다.",
//     "예시) YYYYMMDD",
//   ],
//   ["작업희망일", "필수", "작업을 희망하는 날짜를 양식에 맞게 입력해주세요.", "예시) YYYYMMDD"],
//   [
//     "희망도착시간",
//     "필수",
//     "희망 도착시간을 양식에 맞게 입력해 주세요.\n24시간제를 기준으로 작성 해주세요.",
//     "예시) 15:30",
//   ],
//   ["고객명", "필수", "고객님의 성함 또는 상호를 입력해주세요.", "예시) 홍길동"],
//   ["고객연락처", "필수", "고객님의 연락처를 입력해주세요.", "예시) 0212345678, 01000000000"],
//   [
//     "주소",
//     "필수",
//     "도로명 주소와 건물번호를 입력해주세요.\n주소정보누리집(www.juso.go.kr) 양식을 따릅니다.",
//     "예시) 테헤란로 11길 22",
//   ],
//   ["상세주소", "필수", "상세 주소를 입력해주세요.", "예시) 101동 203호"],
//   [
//     "우편번호",
//     "필수",
//     "배송처의 우편번호를 입력해주세요.\n주소정보누리집(www.juso.go.kr) 양식을 따릅니다.",
//     "예시) 06232",
//   ],
//   [
//     "볼륨",
//     "필수",
//     "볼륨을 숫자 형태로 입력해주세요.\n*가로 x 세로 x 높이 값을 m^3을 기준으로 작성해주세요.",
//     "예시) 600",
//   ],
//   ["중량", "필수", "중량을 정수 형태로 입력해주세요.\n*kg을 기준으로 작성해주세요.", "예시) 50"],
//   ["고객전달사항", "선택", "고객전달사항을 입력해주세요.", ""],
//   [
//     "예상작업시간",
//     "선택",
//     "도착 후 작업 예상 작업 시간(분) 정수 형태로 입력해주세요.\n작업소요시간 셀이 비어있으면 기본값으로 1을 인식합니다.",
//     "예시) 30",
//   ],
//   [
//     "상품명",
//     "필수",
//     "상품명을 모두 입력해주세요.\n상품이 여러개인 경우 운송장번호를 동일하게 사용하여 다음줄에 입력해주세요.",
//     "예시) 스탠리텀블러50",
//   ],
//   ["상품 코드", "선택", "귀사에서 사용 중인 상품코드를 입력해주세요.", "예시) st05"],
//   [
//     "상품 수량",
//     "필수",
//     "상품의 수량을 정수 형태로 입력해주세요.\n상품수량 셀이 비어있으면 기본값으로 1을 인식합니다.",
//     "예시) 5",
//   ],
// ];

// const downloadExampleFile = () => {
//   const sheetName = "운송_주문_양식";

//   const worksheet = XLSX.utils.aoa_to_sheet(EXCEL_HEADER_INFOS);
//   const workbook = XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

//   const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelFile], {
//     // type: "application/octet-stream"
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "운송_주문_양식.xlsx");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export default downloadExampleFile;

interface CellStyleOptions {
  backgroundColor?: string;
  fontSize?: number;
  bold?: boolean;
  hAlign?: "left" | "center" | "right";
  vAlign?: "top" | "center" | "bottom";
  border?: boolean;
}

const EXAMPLE_SHEETNAME = "운송_주문_양식";

const EXCEL_HEADER_INFOS = [
  {
    name: "배송유형 (지입/용차/택배)",
    required: "필수",
    comment: "배송유형은 지입/용차/택배로 구분하여 입력해주세요.",
    example: "예시) 지입",
  },
  {
    name: "SM명",
    required: "필수",
    comment:
      "특정 주문을 작업할 담당 드라이버를 지정해주세요.\nGLT 코리아에 등록되지 않은 드라이버의 이름을 입력하면 오류가 발생합니다.",
    example: "예시) 이서원",
  },
  {
    name: "운송장번호",
    required: "필수",
    comment: "주문번호에 할당된 운송장번호를 입력해주세요.",
    example: "예시) C0029384889",
  },
  {
    name: "업체주문번호",
    required: "선택",
    comment:
      "운송장 번호가 할당된 주문번호를 입력해주세요.\n관리의 편리함을 위해 있는 입력칸으로,\n필수값이 아니며 임의로 작성해주셔도 됩니다.",
    example: "예시) 240812_공동구매",
  },
  {
    name: "주문유형",
    required: "선택",
    comment: "배송/수거",
    example: "예시) 수거",
  },
  {
    name: "주문접수일",
    required: "필수",
    comment: "주문이 귀사에 접수된 날짜를 양식에 맞게 입력해주세요.\n미래의 날짜는 입력할 수 없습니다.",
    example: "예시) YYYYMMDD",
  },
  {
    name: "작업희망일",
    required: "필수",
    comment: "작업을 희망하는 날짜를 양식에 맞게 입력해주세요.",
    example: "예시) YYYYMMDD",
  },
  {
    name: "희망도착시간",
    required: "필수",
    comment: "희망 도착시간을 양식에 맞게 입력해 주세요.\n24시간제를 기준으로 작성 해주세요.",
    example: "예시) 15:30",
  },
  {
    name: "고객명",
    required: "필수",
    comment: "고객님의 성함 또는 상호를 입력해주세요.",
    example: "예시) 홍길동",
  },
  {
    name: "고객연락처",
    required: "필수",
    comment: "고객님의 연락처를 입력해주세요.",
    example: "예시) 0212345678, 01000000000",
  },
  {
    name: "주소",
    required: "필수",
    comment: "도로명 주소와 건물번호를 입력해주세요.\n주소정보누리집(www.juso.go.kr) 양식을 따릅니다.",
    example: "예시) 테헤란로 11길 22",
  },
  {
    name: "상세주소",
    required: "필수",
    comment: "상세 주소를 입력해주세요.",
    example: "예시) 101동 203호",
  },
  {
    name: "우편번호",
    required: "필수",
    comment: "배송처의 우편번호를 입력해주세요.\n주소정보누리집(www.juso.go.kr) 양식을 따릅니다.",
    example: "예시) 06232",
  },
  {
    name: "볼륨",
    required: "필수",
    comment: "볼륨을 숫자 형태로 입력해주세요.\n*가로 x 세로 x 높이 값을 m^3을 기준으로 작성해주세요.",
    example: "예시) 600",
  },
  {
    name: "중량",
    required: "필수",
    comment: "중량을 정수 형태로 입력해주세요.\n*kg을 기준으로 작성해주세요.",
    example: "예시) 50",
  },
  {
    name: "고객전달사항",
    required: "선택",
    comment: "고객전달사항을 입력해주세요.",
    example: "",
  },
  {
    name: "예상작업시간",
    required: "선택",
    comment:
      "도착 후 작업 예상 작업 시간(분) 정수 형태로 입력해주세요.\n작업소요시간 셀이 비어있으면 기본값으로 1을 인식합니다.",
    example: "예시) 30",
  },
  {
    name: "상품명",
    required: "필수",
    comment: "상품명을 모두 입력해주세요.\n상품이 여러개인 경우 운송장번호를 동일하게 사용하여 다음줄에 입력해주세요.",
    example: "예시) 스탠리텀블러50",
  },
  {
    name: "상품 코드",
    required: "선택",
    comment: "귀사에서 사용 중인 상품코드를 입력해주세요.",
    example: "예시) st05",
  },
  {
    name: "상품 수량",
    required: "필수",
    comment: "상품의 수량을 정수 형태로 입력해주세요.\n상품수량 셀이 비어있으면 기본값으로 1을 인식합니다.",
    example: "예시) 5",
  },
];

// const createCellStyle = (cell: XLSX.CellObject, options: CellStyleOptions = {}) => {
//   if (!cell.s) cell.s = {}; // 스타일이 없는 경우 빈 객체로 초기화

//   if (options.backgroundColor) {
//     cell.s.fill = {
//       patternType: "solid",
//       fgColor: { rgb: options.backgroundColor },
//     };
//   }
//   if (options.fontSize || options.bold) {
//     cell.s.font = {
//       sz: options.fontSize || 11,
//       bold: options.bold || false,
//     };
//   }
//   if (options.hAlign || options.vAlign) {
//     cell.s.alignment = {
//       horizontal: options.hAlign || "center",
//       vertical: options.vAlign || "center",
//     };
//   }
//   if (options.border) {
//     cell.s.border = {
//       top: { style: "thin" },
//       right: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//     };
//   }
// };

const createRow = (worksheet: XLSX.WorkSheet, rowIndex: number, styleOptions: CellStyleOptions = {}) => {
  EXCEL_HEADER_INFOS.forEach((header, colIndex) => {
    let value: string;
    if (rowIndex === 0) {
      value = header.name;
    } else if (rowIndex === 1) {
      value = header.required;
    } else if (rowIndex === 2) {
      value = header.comment;
    } else if (rowIndex === 3) {
      value = header.example;
    } else {
      value = "";
    }

    const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
    worksheet[cellAddress] = { v: value, t: "string" };
    // createCellStyle(worksheet[cellAddress], styleOptions);
  });
};

const downloadExampleFile = () => {
  const headerKeys = ["name", "required", "comment", "example"] as const;
  const data = headerKeys.map((key) => EXCEL_HEADER_INFOS.map((item) => item[key]));

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // const worksheet = XLSX.utils.aoa_to_sheet(Array.from({ length: 4 }, () => []));
  // const workbook = XLSX.utils.book_new();

  // createRow(worksheet, 0, { backgroundColor: "D9D9D9", bold: true });
  // createRow(worksheet, 1, { backgroundColor: "E6E6E6" });
  // createRow(worksheet, 2, { backgroundColor: "FFFACD" });
  // createRow(worksheet, 3);

  worksheet["!cols"] = EXCEL_HEADER_INFOS.map(() => ({ wpx: 150 }));

  XLSX.utils.book_append_sheet(workbook, worksheet, EXAMPLE_SHEETNAME);

  const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelFile], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "운송_주문_양식.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadExampleFile;

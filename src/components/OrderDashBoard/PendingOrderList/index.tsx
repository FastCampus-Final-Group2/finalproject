"use client";

import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/components/DragDrop/StrictModeDroppable";
import Icon from "@/components/core/Icon";
import PendingOrder from "@/components/OrderDashBoard/PendingOrderList/PendingOrder";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { ListStopOverData } from "@/components/SideTapDriverDetail";
import * as XLSX from "xlsx";

interface PendingOrderDataProps {
  listPendingOrderData: ListStopOverData[];
}

const PendingOrderList = ({ listPendingOrderData }: PendingOrderDataProps) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(false);

  // 보류 주문 데이터를 엑셀로 변환 및 다운로드하는 함수
  const downloadPendingOrders = () => {
    // 1. address, meter, kilogram 필드만 추출한 데이터 생성
    const extractedData = listPendingOrderData.map((order) => ({
      address: order.address,
      meter: order.meter,
      kilogram: order.kilogram,
    }));

    // 2. 데이터를 엑셀 시트 형식으로 변환
    const worksheet = XLSX.utils.json_to_sheet(extractedData);

    // 3. 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Orders");

    // 4. 엑셀 파일을 사용자에게 다운로드하도록 트리거
    XLSX.writeFile(workbook, "pending_orders.xlsx");
  };

  return (
    <div className="max-h-[344px] min-h-[64px] w-[460px] gap-[16px] rounded-[8px] bg-white p-[20px]">
      <div className="inline-flex h-6 w-[420px] flex-col items-start justify-start gap-4 bg-white">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-900 text-T-18-B">보류주문 ({listPendingOrderData.length})</span>
            </div>

            <div className="h-[20px] w-[0px] border border-gray-200"></div>

            {/* 다운로드 버튼 */}
            <button className="flex items-center gap-[4px] text-blue-500 text-B-14-M" onClick={downloadPendingOrders}>
              <Icon id="download" size={14} className="text-blue-500" />
              <span>다운로드</span>
            </button>
          </div>
          <button onClick={toggleExpand}>
            {isExpanded ? <Icon id="arrowUp" size={24} /> : <Icon id="arrowDown" size={24} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <StrictModeDroppable droppableId="droppablePendingOrderData">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="inline-flex max-h-[264px] w-full flex-col items-start justify-start gap-4 overflow-y-auto rounded-lg bg-white pt-[16px] scrollbar-hide"
            >
              {listPendingOrderData.map((order, index) => (
                <Draggable key={order.id} draggableId={`pendingOrder-${order.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <PendingOrder address={order.address} meter={order.meter} kilogram={order.kilogram} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      )}
    </div>
  );
};

export default PendingOrderList;

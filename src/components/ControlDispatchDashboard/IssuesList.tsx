"use client";

import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { useMemo, useState } from "react";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import { Issue } from "@/models/ApiTypes";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";
const IssuesList = ({
  fetchedIssues,
  onClickToggle,
}: {
  fetchedIssues: Issue[];
  onClickToggle: (color: ColorType, dispatchId: number, destinationId?: number) => void;
}) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryDestinationId, setSelectedDeliveryDestinationId] = useState<number | null>(null);
  // deliveryIssues를 useMemo로 감싸서 메모이제이션 처리
  const issues = useMemo(() => fetchedIssues, [fetchedIssues]);

  const handleItemClick = (e: React.MouseEvent, issue: Issue) => {
    e.stopPropagation();
    // 이 부분에서 onClickToggle을 호출하여 DeliveryProgressSideTab을 열도록 합니다.
    // 색상은 임의로 'lime'으로 설정했지만, 실제 사용 시 적절한 색상을 선택해야 합니다.
    onClickToggle("lime", issue.dispatchId ?? 0, issue.deliveryDestinationId ?? 0);
    console.log("issue destinationId", issue.deliveryDestinationId);
  };

  const handleAddressClick = (e: React.MouseEvent, issue: Issue) => {
    e.stopPropagation();
    setSelectedDeliveryDestinationId(issue.deliveryDestinationId || null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-h-[344px] min-h-[64px] w-[460px] gap-[16px] rounded-[8px] bg-white p-[20px]">
        <div className="inline-flex h-6 w-[420px] flex-col items-start justify-start gap-4 bg-white">
          <div className="flex w-full items-center justify-between">
            <ul className="flex items-center gap-[8px]">
              <li className="flex items-center gap-1 text-red-500 text-T-18-B">이슈상황 모아보기</li>
              <li className="h-[20px] w-[0px] border-l border-gray-200"></li>
              <li className="text-gray-900 text-B-14-R">
                미확인 <span className="text-red-500 text-B-14-B">{issues.length}</span>건
              </li>
            </ul>
            <button onClick={toggleExpand}>
              {isExpanded ? <Icon id="arrowUp" size={24} /> : <Icon id="arrowDown" size={24} />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="max-h-[264px] w-full flex-col overflow-y-auto pt-[16px] scrollbar-hide">
            <ul className="flex w-full flex-col items-start justify-start gap-[10px]">
              {issues.map((issue) => (
                <li
                  key={issue.dispatchId}
                  className="flex h-[40px] w-full cursor-pointer items-center gap-[8px] whitespace-nowrap rounded-[4px] px-[12px] py-[6px] text-B-14-B hover:bg-gray-50"
                  onClick={(e) => handleItemClick(e, issue)}
                >
                  <p>{issue.smName}</p>
                  <p className="h-[20px] w-[0px] border-l border-gray-200"></p>
                  <p
                    className="w-[160px]cursor-pointer h-fit whitespace-nowrap border-b border-blue-500 text-blue-500 text-C-12-M"
                    onClick={(e) => handleAddressClick(e, issue)}
                  >
                    {issue.address}
                  </p>
                  <p className="h-[20px] w-[0px] border-l border-gray-200"></p>
                  <p className="flex gap-[4px] text-red-500 text-C-12-M">
                    <Icon id="warningFill" size={14} className="text-red-500" />
                    <span>시작 예상 시간 {issue.delayedTime}분 초과</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isModalOpen && selectedDeliveryDestinationId && (
          <DeliveryModal id={selectedDeliveryDestinationId} isCenter={false} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default IssuesList;

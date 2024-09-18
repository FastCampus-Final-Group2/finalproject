"use client";

import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { useMemo, useState, useEffect } from "react";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import { Issue } from "@/models/ApiTypes";
import { useRecoilState } from "recoil";
import { issueCheckState } from "@/atoms/issueCheck";
import { useParams } from "next/navigation";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";
interface ClickedIssue {
  dispatchCodeId: number;
  dispatchId: number;
  deliveryDestinationId: number;
}

const IssuesList = ({
  fetchedIssues,
  onClickToggle,
  onIssueSelect, // 새로운 prop 추가
}: {
  fetchedIssues: Issue[];
  onClickToggle: (color: ColorType, dispatchId: number, destinationId?: number) => void;
  onIssueSelect: (dispatchId: number) => void; // 새로운 prop 타입 정의
}) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryDestinationId, setSelectedDeliveryDestinationId] = useState<number | null>(null);
  const [clickedIssues, setClickedIssues] = useRecoilState(issueCheckState);
  const { dispatchCodeId } = useParams();
  const [unreadIssues, setUnreadIssues] = useState<Issue[]>([]);

  // 로컬 스토리지에서 읽은 이슈 목록을 가져오는 함수
  const getReadIssuesFromStorage = () => {
    const storedIssues = localStorage.getItem(`readIssues_${dispatchCodeId?.toString()}`);
    return storedIssues ? (JSON.parse(storedIssues) as ClickedIssue[]) : [];
  };

  // 읽지 않은 이슈 목록을 업데이트하는 함수
  const updateUnreadIssues = () => {
    const readIssues = getReadIssuesFromStorage();
    const newUnreadIssues = fetchedIssues.filter(
      (issue) =>
        !readIssues.some(
          (readIssue: ClickedIssue) =>
            readIssue.dispatchCodeId === Number(dispatchCodeId) &&
            readIssue.dispatchId === issue.dispatchId &&
            readIssue.deliveryDestinationId === issue.deliveryDestinationId,
        ),
    );
    setUnreadIssues(newUnreadIssues);
  };

  // 컴포넌트 마운트 시 및 fetchedIssues, dispatchCodeId 변경 시 unreadIssues 업데이트
  useEffect(() => {
    updateUnreadIssues();
  }, [fetchedIssues, dispatchCodeId]);

  const handleItemClick = (e: React.MouseEvent, issue: Issue) => {
    e.stopPropagation();
    onClickToggle("lime", issue.dispatchId ?? 0, issue.deliveryDestinationId ?? 0);
    onIssueSelect(issue.dispatchId ?? 0); // 이슈 선택 시 해당 기사의 dispatchId 전달

    const newClickedIssue = {
      dispatchCodeId: Number(dispatchCodeId),
      dispatchId: issue.dispatchId ?? 0,
      deliveryDestinationId: issue.deliveryDestinationId ?? 0,
    };

    const updatedClickedIssues = [...clickedIssues, newClickedIssue];
    setClickedIssues(updatedClickedIssues);

    // 로컬 스토리지에 읽은 이슈 목록 저장
    localStorage.setItem(`readIssues_${dispatchCodeId?.toString()}`, JSON.stringify(updatedClickedIssues));

    // unreadIssues 업데이트
    updateUnreadIssues();
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
                미확인 <span className="text-red-500 text-B-14-B">{unreadIssues.length}</span>건
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
              {fetchedIssues.map((issue) => {
                const isRead = clickedIssues.some(
                  (clickedIssue) =>
                    clickedIssue.dispatchCodeId === Number(dispatchCodeId) &&
                    clickedIssue.dispatchId === issue.dispatchId &&
                    clickedIssue.deliveryDestinationId === issue.deliveryDestinationId,
                );
                return (
                  <li
                    key={issue.dispatchId}
                    className={`flex h-[40px] w-full cursor-pointer items-center gap-[8px] whitespace-nowrap rounded-[4px] px-[12px] py-[6px] text-B-14-B ${
                      isRead ? "bg-white" : "bg-red-30"
                    } hover:bg-gray-50`}
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
                );
              })}
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

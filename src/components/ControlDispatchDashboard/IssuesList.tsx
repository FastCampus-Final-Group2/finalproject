"use client";

import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { useMemo } from "react";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import { Issue } from "@/models/ApiTypes";
const IssuesList = ({ fetchedIssues }: { fetchedIssues: Issue[] }) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(true);

  // deliveryIssues를 useMemo로 감싸서 메모이제이션 처리
  const issues = useMemo(() => fetchedIssues, [fetchedIssues]);

  return (
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
                onClick={() => alert("기사 상세 배송 목록 섹션이 펴지면서 오류 항목을 보여줌")}
              >
                <p>{issue.smName}</p>
                <p className="h-[20px] w-[0px] border-l border-gray-200"></p>
                <p
                  className="h-fit cursor-pointer whitespace-nowrap border-b border-blue-500 text-blue-500 text-C-12-M"
                  onClick={() => alert(issue.dispatchId)}
                >
                  {issue.address}
                </p>
                <p className="h-[20px] w-[0px] border-l border-gray-200"></p>
                <p className="flex gap-[4px] text-red-500 text-C-12-M">
                  <Icon id="warningFill" size={14} className="text-red-500" />
                  <span>{issue.issue}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IssuesList;

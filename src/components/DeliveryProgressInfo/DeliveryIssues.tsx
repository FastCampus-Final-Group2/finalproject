"use client";

import Icon from "@/components/core/Icon";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { DispatchApi } from "@/apis/dispatches/dispatch";
import { IssueRequest } from "@/models/ApiTypes";
import { debounce } from "@/utils/debounce";

const DeliveryIssue = ({ issue, dispatchId }: { issue: string; dispatchId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState(issue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedIssue, setSavedIssue] = useState(issue);

  // 메모 저장 로직
  const debouncedFetchIssue = useCallback(
    async (text: string) => {
      try {
        const issueRequest: IssueRequest = { issue: text };
        const [error, response] = await DispatchApi.issue(dispatchId, issueRequest);
        if (error) {
          console.error("이슈 저장 중 오류 발생:", error);
        } else {
          setSavedIssue(text);
          console.log("이슈가 성공적으로 저장되었습니다:", response);
        }
      } catch (error) {
        console.error("이슈 저장 중 예외 발생:", error);
      }
    },
    [dispatchId, setSavedIssue],
  );

  // 메모 입력 디바운스
  const debouncedSaveIssue = useMemo(() => debounce(debouncedFetchIssue, 1000), [debouncedFetchIssue]);
  useEffect(() => {
    if (memo !== savedIssue) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      debouncedSaveIssue(memo);
    }
  }, [memo, savedIssue, debouncedSaveIssue]);

  // 300자 이내로 입력
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, 300);
    setMemo(newText);
  };

  // 이슈 메모 삭제
  const handleDelete = () => {
    setMemo("");
    setSavedIssue("");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    debouncedFetchIssue("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-[418px] rounded-[8px] border px-[12px] py-[8px] text-B-14-M">
        <ul className="flex">
          <li className="min-h-[32px] flex-1">
            {isOpen ? (
              <textarea
                value={memo}
                onChange={handleMemoChange}
                placeholder={`배송이슈 및 기타 메모 입력\n(300자 이내)`}
                className="h-[150px] w-full resize-none whitespace-pre-line scrollbar-hide"
              />
            ) : (
              <p className="whitespace-pre-line text-gray-600">
                {savedIssue || "배송이슈 및 기타 메모 입력\n(300자 이내)"}
              </p>
            )}
          </li>
          <li className="ml-[8px] flex flex-col items-center justify-between">
            <Icon
              id={isOpen ? "arrowUp" : "arrowDown"}
              size={16}
              onClick={() => setIsOpen(!isOpen)}
              role="button"
              className="cursor-pointer"
            />
            <div
              className={`cursor-pointer rounded-full bg-gray-300 p-[4px] hover:bg-gray-700 ${isOpen ? "" : "hidden"}`}
              onClick={() => setIsModalOpen(true)} // Open the modal when clicking the delete icon
              role="button"
            >
              <Icon id="delete" size={16} className="text-white" />
            </div>
          </li>
        </ul>
      </div>
      {isModalOpen && (
        <ConfirmModal
          title="배송이슈 메모를 삭제하시겠습니까?"
          text={[{ type: "alert", value: "삭제 시, 복구되지 않습니다." }]}
          leftButtonText="아니오"
          rightButtonText="네"
          doConfirm={true}
          onConfirm={handleDelete}
          onClickClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DeliveryIssue;

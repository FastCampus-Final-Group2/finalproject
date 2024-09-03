"use client";

import Icon from "@/components/core/Icon";
import React, { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

const DeliveryIssues = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState(""); // State to hold the memo text
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) {
      setMemo(e.target.value);
    }
  };

  const handleDelete = () => {
    if (confirm("Do you really want to delete the memo?")) {
      setMemo("");
      handleModalClose();
    }
  };

  const maxCollapsedLength = 60;

  const displayedText = isOpen
    ? memo
    : memo.length > maxCollapsedLength
      ? `${memo.slice(0, maxCollapsedLength)}...`
      : memo;

  // Define the alert message here
  const alertMessage = {
    type: "alert",
    value: "삭제 시, 복구되지 않습니다.",
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
                {displayedText || "배송이슈 및 기타 메모 입력\n(300자 이내)"}
              </p>
            )}
          </li>
          <li className="ml-[8px] flex flex-col items-center justify-between">
            <Icon
              id={isOpen ? "arrowUp" : "arrowDown"}
              size={16}
              onClick={handleIsOpen}
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
          title="삭제 확인"
          text={[alertMessage]}
          leftButtonText="아니오"
          rightButtonText="네"
          onConfirm={handleDelete}
          onClickClose={handleModalClose}
        />
      )}
    </>
  );
};

export default DeliveryIssues;

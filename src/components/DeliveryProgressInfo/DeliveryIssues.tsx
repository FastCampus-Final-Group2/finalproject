"use client";

import Icon from "@/components/core/Icon";
import React from "react";
import { useState } from "react";

const DeliveryIssues = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState(""); // State to hold the memo text

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
    }
  };

  const maxCollapsedLength = 60;

  const displayedText = isOpen
    ? memo
    : memo.length > maxCollapsedLength
      ? `${memo.slice(0, maxCollapsedLength)}...`
      : memo;

  return (
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
            onClick={handleDelete}
            role="button"
          >
            <Icon id="delete" size={16} className="text-white" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryIssues;

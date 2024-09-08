"use client";

import { useState } from "react";
import Icon from "@/components/core/Icon";

const searchKeyword = [
  {
    id: 1,
    name: "배차 코드",
    value: "dispatchCode",
  },
  {
    id: 2,
    name: "배차명",
    value: "dispatchName",
  },
  {
    id: 3,
    name: "배차담당자명",
    value: "manager",
  },
  {
    id: 4,
    name: "드라이버명",
    value: "driverName",
  },
];

const SearchCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("[선택]");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <p className="flex w-[124px] cursor-pointer items-center justify-between" onClick={toggleDropdown}>
        {selectedCategory} <Icon id="arrowDown" />
      </p>
      {isOpen && (
        <ul className="absolute left-[-12px] z-20 mt-[20px] flex w-[156px] flex-col gap-[7px] rounded-[8px] border border-gray-200 bg-white px-[16px] py-[10px]">
          {searchKeyword.map((keyword) => (
            <li
              key={keyword.id}
              className="cursor-pointer p-[4px] hover:bg-blue-100"
              onClick={() => handleCategorySelect(keyword.name)}
            >
              {keyword.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCategory;

"use client";

import { useState } from "react";
import Icon from "@/components/core/Icon";

const searchKeyword = [
  {
    name: "배차 코드",
    value: "dispatchCode",
  },
  {
    name: "배차명",
    value: "dispatchName",
  },
  {
    name: "배차담당자명",
    value: "manager",
  },
  {
    name: "드라이버명",
    value: "driverName",
  },
];

interface SearchCategoryProps {
  onCategoryChange: (category: string) => void;
}

const SearchCategory = ({ onCategoryChange }: SearchCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("[선택]");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    const selectedKeyword = searchKeyword.find((k) => k.name === category);
    if (selectedKeyword) {
      onCategoryChange(selectedKeyword.value);
    }
  };

  return (
    <div className="relative">
      <p className="flex w-[124px] cursor-pointer items-center justify-between" onClick={toggleDropdown}>
        {selectedCategory} <Icon id="arrowDown" />
      </p>
      {isOpen && (
        <ul className="absolute left-[-12px] z-20 mt-[20px] flex w-[156px] flex-col gap-[7px] rounded-[8px] border border-gray-200 bg-white px-[16px] py-[10px]">
          {searchKeyword.map((keyword, index) => (
            <li
              key={index}
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

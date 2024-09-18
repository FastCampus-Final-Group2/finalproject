"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/core/Icon";

const searchMoreOptions = [
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

interface SearchOptionProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const SearchOption = ({ selectedOption, setSelectedOption }: SearchOptionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (option: { name: string; value: string }) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  const getSelectedOptionName = () => {
    return searchMoreOptions.find((option) => option.value === selectedOption)?.name || "[선택]";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="flex w-[124px] cursor-pointer items-center justify-between" onClick={toggleDropdown}>
        {getSelectedOptionName()} <Icon id="arrowDown" />
      </p>
      {isOpen && (
        <ul className="absolute left-[-12px] z-20 mt-[20px] flex w-[156px] flex-col gap-[7px] rounded-[8px] border border-gray-200 bg-white px-[16px] py-[10px]">
          {searchMoreOptions.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer p-[4px] hover:bg-blue-100"
              onClick={() => handleCategorySelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchOption;

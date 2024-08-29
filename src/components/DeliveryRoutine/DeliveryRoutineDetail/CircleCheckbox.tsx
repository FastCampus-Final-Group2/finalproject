"use client";

import React, { ChangeEvent, useCallback, useReducer } from "react";
import Icon, { IconId } from "@/components/core/Icon";

interface CircleCheckboxProps {
  status: string;
  order: number;
  initialState?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const CircleCheckbox = React.forwardRef<HTMLInputElement, CircleCheckboxProps>(
  ({ status, order, initialState = false, onChange }, ref) => {
    const [isChecked, toggleCheckBox] = useReducer((v) => !v, initialState);

    const handleCheckboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (status !== "cancelled" && status !== "completed") {
          toggleCheckBox();
          if (onChange) onChange(event, !isChecked);
        }
      },
      [onChange, status, isChecked],
    );

    const iconId: IconId =
      status === "cancelled"
        ? "circleDashFill"
        : status === "completed"
          ? "circleFill"
          : isChecked
            ? "circleCheck"
            : "circle";

    return (
      <div className="flex w-[46px] justify-center pt-[16px]">
        <div className="relative flex h-fit cursor-pointer items-center justify-center text-gray-400 hover:text-blue-500">
          <input type="checkbox" checked={isChecked} className="hidden" onChange={handleCheckboxChange} ref={ref} />
          <Icon
            id={iconId}
            className={` ${isChecked ? "text-blue-500" : ""} hover:text-blue-500`}
            size={status === "cancelled" || status === "completed" ? 16 : 24}
          />
          <p
            className={`${status === "cancelled" || status === "completed" || isChecked ? "hidden" : ""} absolute text-C-12-M`}
            onClick={handleCheckboxChange}
          >
            {order}
          </p>
        </div>
      </div>
    );
  },
);

CircleCheckbox.displayName = "CircleCheckbox";

export default CircleCheckbox;

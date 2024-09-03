"use client";

import React, { ChangeEvent, MouseEvent, useCallback, useReducer } from "react";
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
        if (status !== "CANCELED" && status !== "WORK_COMPLETED" && status !== "RESTING") {
          toggleCheckBox();
          if (onChange) onChange(event, !isChecked);
        }
      },
      [onChange, status, isChecked],
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (status !== "CANCELED" && status !== "WORK_COMPLETED" && status !== "RESTING") {
          toggleCheckBox();
          if (onChange) onChange(event as unknown as ChangeEvent<HTMLInputElement>, !isChecked);
        }
      },
      [onChange, status, isChecked],
    );

    const iconId: IconId =
      status === "RESTING"
        ? "coffee"
        : status === "CANCELED"
          ? "circleDashFill"
          : status === "WORK_COMPLETED"
            ? "circleFill"
            : isChecked
              ? "circleCheck"
              : "circle";

    return (
      <div
        className={`relative flex h-[88px] w-[46px] items-start justify-center pt-[16px] before:absolute before:left-1/2 before:top-[50px] before:h-[56px] before:-translate-x-1/2 before:border-l-[2px] before:border-dashed before:border-gray-400`}
      >
        <div
          className={`relative flex cursor-pointer items-center justify-center rounded-full text-gray-400 hover:text-blue-500 ${status === "RESTING" ? "h-[20px] w-[20px] cursor-default bg-orange-500" : ""}`}
          onClick={handleClick}
          role="input"
        >
          <input type="checkbox" checked={isChecked} className="hidden" onChange={handleCheckboxChange} ref={ref} />
          <Icon
            id={iconId}
            className={`${isChecked ? "text-blue-500" : ""} ${status === "CANCELED" || status === "WORK_COMPLETED" || status === "RESTING" ? "cursor-default hover:text-gray-400" : ""} ${status === "RESTING" ? "text-white hover:text-white" : ""}`}
            size={status === "CANCELED" || status === "WORK_COMPLETED" || status === "RESTING" ? 16 : 24}
          />
          <p
            className={`${status === "CANCELED" || status === "WORK_COMPLETED" || status === "RESTING" ? "hidden" : ""} absolute text-C-12-M`}
          >
            <span className={`${isChecked ? "hidden" : ""}`}>{order}</span>
          </p>
        </div>
      </div>
    );
  },
);

CircleCheckbox.displayName = "CircleCheckbox";

export default CircleCheckbox;

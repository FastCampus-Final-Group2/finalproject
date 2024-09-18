"use client";

import React, { ChangeEvent, MouseEvent, useCallback, useReducer } from "react";
import Icon, { IconId } from "@/components/core/Icon";

interface CircleCheckboxProps {
  status: string;
  order: number;
  initialState?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean, status: string) => void;
  delayedTime?: number;
  destinationComment?: string;
}

const CircleCheckbox = React.forwardRef<HTMLInputElement, CircleCheckboxProps>(
  ({ status, order, delayedTime, destinationComment, initialState = false, onChange }, ref) => {
    const [isChecked, toggleCheckBox] = useReducer((v) => !v, initialState);

    const handleCheckboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (status !== "CANCELED" && status !== "WORK_COMPLETED" && status !== "RESTING") {
          toggleCheckBox();
          if (onChange) onChange(event, !isChecked, status);
        }
      },
      [onChange, status, isChecked],
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (status !== "CANCELED" && status !== "WORK_COMPLETED" && status !== "RESTING") {
          toggleCheckBox();
          if (onChange) onChange(event as unknown as ChangeEvent<HTMLInputElement>, !isChecked, status);
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
        className={`relative flex w-[46px] items-start justify-center pt-[16px] ${
          delayedTime && destinationComment ? "h-[124px] before:h-[92px]" : "h-[88px] before:h-[56px]"
        } before:absolute before:left-1/2 before:top-[50px] before:-translate-x-1/2 before:border-l-[2px] before:border-dashed before:border-gray-400`}
      >
        <div
          className={`relative flex cursor-pointer items-center justify-center rounded-full text-gray-400 hover:text-blue-500 ${status === "RESTING" ? "h-[20px] w-[20px] cursor-default bg-orange-500" : ""}`}
          onClick={handleClick}
          role="input"
        >
          <input type="checkbox" checked={isChecked} className="hidden" onChange={handleCheckboxChange} ref={ref} />
          <Icon
            id={iconId}
            className={`${isChecked ? "text-blue-500" : ""} ${status === "CANCELED" || status === "WORK_COMPLETED" || status === "RESTING" ? "cursor-default text-gray-400 hover:text-gray-400" : ""} ${status === "RESTING" ? "text-white hover:text-white" : ""}`}
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

"use client";

import React, { ChangeEvent, useCallback, useReducer } from "react";
import Icon from "@/components/core/Icon";
import useOnlyClient from "@/hooks/useOnlyClient";

interface CheckBoxProps extends React.ComponentPropsWithoutRef<"input"> {
  initialState?: boolean;
  label?: string;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(function RefCheckBox(
  { initialState, label, onChange, ...props },
  ref,
) {
  const isClient = useOnlyClient();

  const [isChecked, toggleCheckBox] = useReducer((v) => !v, initialState || false);

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      toggleCheckBox();
      if (onChange) onChange(event);
    },
    [onChange],
  );

  if (!isClient) {
    return (
      <label className="flex w-fit cursor-pointer gap-1">
        <Icon id="checkBox" size={20} className="text-gray-500" />
        {label && <span className="text-gray-700 text-T-16-M">{label}</span>}
      </label>
    );
  }

  return (
    <label className="flex w-fit cursor-pointer gap-1">
      <input
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={handleCheckboxChange}
        ref={ref}
        {...props}
      />
      <Icon id={isChecked ? "checkBoxFill" : "checkBox"} size={20} className="text-gray-500" />
      {label && <span className="text-gray-700 text-T-16-M">{label}</span>}
    </label>
  );
});

export default CheckBox;

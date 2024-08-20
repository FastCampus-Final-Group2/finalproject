"use client";

import React, { useCallback, useReducer } from "react";
import Icon from "@/components/core/Icon";

interface CheckBoxProps extends React.ComponentPropsWithoutRef<"input"> {
  initialState?: boolean;
  label?: string;
  handleChange?: () => void;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(function RefCheckBox(
  { initialState, label, handleChange, ...props },
  ref,
) {
  const [isChecked, toggleCheckBox] = useReducer((v) => !v, initialState || false);

  const handleCheckboxChange = useCallback(() => {
    toggleCheckBox();
    if (handleChange) handleChange();
  }, [handleChange]);

  return (
    <label className="flex cursor-pointer gap-1">
      <input
        type="checkbox"
        checked={isChecked}
        className="appearance-none"
        onChange={handleCheckboxChange}
        ref={ref}
        {...props}
      />
      <Icon id={isChecked ? "checkBoxFill" : "checkBox"} size={20} />
      {label && <span className="text-T-16-M">{label}</span>}
    </label>
  );
});

export default CheckBox;

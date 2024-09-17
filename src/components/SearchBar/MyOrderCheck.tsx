import React from "react";
import Icon from "@/components/core/Icon";

interface MyOrderCheckProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyOrderCheck = ({ label, checked, onChange, ...props }: MyOrderCheckProps) => {
  return (
    <label className="flex w-fit cursor-pointer gap-1">
      <input type="checkbox" checked={checked} onChange={onChange} {...props} className="hidden" />
      <Icon id={checked ? "checkBoxFill" : "checkBox"} size={20} className="text-gray-500" />
      <span className="text-gray-700 text-T-16-M">{label}</span>
    </label>
  );
};

export default MyOrderCheck;

"use client";

import Icon from "@/components/core/Icon";
import Dimmed from "@/components/core/Dimmed";
import CheckBox from "@/components/core/CheckBox";
import Button from "@/components/core/Button";
import { useReducer } from "react";
import { cn } from "@/utils/cn";
import { textVariants } from "./index.constants";

interface ConfirmModalProps {
  title: string;
  text?: {
    type: "main" | "sub" | "alert";
    value: string;
  }[];
  onConfirm?: () => void;
  leftButtonText: string;
  rightButtonText: string;
}

const ConfirmModal = ({ title, text, onConfirm, leftButtonText, rightButtonText }: ConfirmModalProps) => {
  const [isConfirmed, toggleIsConfirmed] = useReducer((v) => !v, false);

  return (
    <Dimmed>
      <div className="flex h-[289px] w-[392px] flex-col rounded-xl bg-white px-6 pb-6 pt-[22px]">
        <div className="flex flex-grow flex-col items-center justify-center gap-3">
          <Icon id="circleAlert" size={40} className="text-gray-800" />
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-900 text-T-18-B">{title}</p>
            <div className="text-center">
              {text?.map(({ type, value }) => {
                return (
                  <p key={type} className={cn(textVariants({ type }))}>
                    {value}
                  </p>
                );
              })}
            </div>
          </div>
          {onConfirm && (
            <div className="flex items-center justify-center gap-1 text-gray-900">
              <CheckBox onChange={() => toggleIsConfirmed()} label="위 내용을 확인했습니다." />
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Button shape="text" intent="secondary" className="w-[156px]">
            {leftButtonText}
          </Button>
          <Button
            disabled={onConfirm ? !isConfirmed : false}
            onClick={onConfirm && (() => onConfirm())}
            className="w-[156px]"
          >
            {rightButtonText}
          </Button>
        </div>
      </div>
    </Dimmed>
  );
};

export default ConfirmModal;

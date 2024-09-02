"use client";

import useDebouncedState from "@/hooks/useDebouncedState";
import useEditTonCode from "@/hooks/useEditTonCode";
import { DeliveryInfo } from "@/types/order";
import { CarModel, Ton, TonCodeObject } from "@/types/tonCode";
import { createContext, useContext, useEffect, useState } from "react";

interface DeliveryModalEditContextProps {
  comment: DeliveryInfo["comment"];
  setComment: React.Dispatch<React.SetStateAction<DeliveryInfo["comment"]>>;
  debouncedComment: DeliveryInfo["comment"];
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  restrictedTonCode: TonCodeObject;
  toggleRestrictedTonCode: (carModel: CarModel, ton: Ton) => void;
  setRestrictedTonCodeAllTrue: (carModel: CarModel) => void;
  setRestrictedTonCodeAllFalse: (carModel: CarModel) => void;
  isEdited: boolean;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeliveryModalEditContextProviderProps {
  initialComment: DeliveryInfo["comment"];
  initialDelayTime: DeliveryInfo["delayTime"];
  initialRestrictedTonCode: TonCodeObject;
  children: React.ReactNode;
}

const DeliveryModalEditContext = createContext<DeliveryModalEditContextProps | null>(null);

export const DeliveryModalEditContextProvider = ({
  initialComment,
  initialDelayTime,
  initialRestrictedTonCode,
  children,
}: DeliveryModalEditContextProviderProps) => {
  const [isEdited, setIsEdited] = useState(false);
  const [comment, setComment, debouncedComment] = useDebouncedState(initialComment, 500);
  const [hour, setHour] = useState(Math.floor(initialDelayTime / 60));
  const [minute, setMinute] = useState(initialDelayTime % 60);
  const { restrictedTonCode, toggleRestrictedTonCode, setRestrictedTonCodeAllTrue, setRestrictedTonCodeAllFalse } =
    useEditTonCode(initialRestrictedTonCode);

  useEffect(() => {
    if (debouncedComment !== initialComment) setIsEdited(true);
    else setIsEdited(false);
  }, [debouncedComment, initialComment, setIsEdited]);

  useEffect(() => {
    if (hour * 60 + minute !== initialDelayTime) setIsEdited(true);
    else setIsEdited(false);
  }, [hour, initialDelayTime, minute, setIsEdited]);

  useEffect(() => {
    if (JSON.stringify(restrictedTonCode) !== JSON.stringify(initialRestrictedTonCode)) setIsEdited(true);
    else setIsEdited(false);
  }, [initialRestrictedTonCode, restrictedTonCode]);

  return (
    <DeliveryModalEditContext.Provider
      value={{
        comment,
        setComment,
        debouncedComment,
        hour,
        setHour,
        minute,
        setMinute,
        restrictedTonCode,
        toggleRestrictedTonCode,
        setRestrictedTonCodeAllTrue,
        setRestrictedTonCodeAllFalse,
        isEdited,
        setIsEdited,
      }}
    >
      {children}
    </DeliveryModalEditContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeliveryModalEditContext = () => {
  const context = useContext(DeliveryModalEditContext);
  if (!context) {
    throw new Error("useDeliveryModalEditContext는 DeliveryModalEditContextProvider 내부에서만 사용해야 합니다.");
  }
  return context;
};

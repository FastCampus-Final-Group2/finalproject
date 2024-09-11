"use client";

import useDebouncedState from "@/hooks/useDebouncedState";
import useEditTonCode from "@/hooks/useEditTonCode";
import { DeliveryInfo } from "@/types/order";
import { RestrictedTonObject, Ton } from "@/types/tonCode";
import { createContext, useContext, useEffect, useState } from "react";

interface RestrictedTonState {
  restrictedTon: RestrictedTonObject;
  toggleRestrictedTon: (ton: Ton) => void;
  setRestrictedTonAllTrue: () => void;
  setRestrictedTonAllFalse: () => void;
}

interface DeliveryModalEditContextProps {
  comment: DeliveryInfo["comment"];
  setComment: React.Dispatch<React.SetStateAction<DeliveryInfo["comment"]>>;
  debouncedComment: DeliveryInfo["comment"];
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  wing: RestrictedTonState;
  top: RestrictedTonState;
  cargo: RestrictedTonState;
  isEdited: boolean;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeliveryModalEditContextProviderProps {
  initialComment: DeliveryInfo["comment"];
  initialDelayTime: DeliveryInfo["delayTime"];
  initialRestrictedWing: RestrictedTonObject;
  initialRestrictedTop: RestrictedTonObject;
  initialRestrictedCargo: RestrictedTonObject;
  children: React.ReactNode;
}

const DeliveryModalEditContext = createContext<DeliveryModalEditContextProps | null>(null);

export const DeliveryModalEditContextProvider = ({
  initialComment,
  initialDelayTime,
  initialRestrictedWing,
  initialRestrictedTop,
  initialRestrictedCargo,
  children,
}: DeliveryModalEditContextProviderProps) => {
  const [isEdited, setIsEdited] = useState(false);
  const [comment, setComment, debouncedComment] = useDebouncedState(initialComment, 500);
  const [hour, setHour] = useState(Math.floor(initialDelayTime / 60));
  const [minute, setMinute] = useState(initialDelayTime % 60);
  const [restrictedWing, toggleRestrictedWing, setRestrictedWingAllTrue, setRestrictedWingAllFalse] =
    useEditTonCode(initialRestrictedWing);
  const [restrictedTop, toggleRestrictedTop, setRestrictedTopAllTrue, setRestrictedTopAllFalse] =
    useEditTonCode(initialRestrictedTop);
  const [restrictedCargo, toggleRestrictedCargo, setRestrictedCargoAllTrue, setRestrictedCargoAllFalse] =
    useEditTonCode(initialRestrictedCargo);

  useEffect(() => {
    if (debouncedComment !== initialComment) setIsEdited(true);
    else setIsEdited(false);
  }, [debouncedComment, initialComment]);

  useEffect(() => {
    if (hour * 60 + minute !== initialDelayTime) setIsEdited(true);
    else setIsEdited(false);
  }, [hour, initialDelayTime, minute, setIsEdited]);

  useEffect(() => {
    if (JSON.stringify(restrictedWing) !== JSON.stringify(initialRestrictedWing)) setIsEdited(true);
    else setIsEdited(false);
  }, [initialRestrictedWing, restrictedWing]);

  useEffect(() => {
    if (JSON.stringify(restrictedTop) !== JSON.stringify(initialRestrictedTop)) setIsEdited(true);
    else setIsEdited(false);
  }, [initialRestrictedTop, restrictedTop]);

  useEffect(() => {
    if (JSON.stringify(restrictedCargo) !== JSON.stringify(initialRestrictedCargo)) setIsEdited(true);
    else setIsEdited(false);
  }, [initialRestrictedCargo, restrictedCargo]);

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
        wing: {
          restrictedTon: restrictedWing,
          toggleRestrictedTon: toggleRestrictedWing,
          setRestrictedTonAllTrue: setRestrictedWingAllTrue,
          setRestrictedTonAllFalse: setRestrictedWingAllFalse,
        },
        top: {
          restrictedTon: restrictedTop,
          toggleRestrictedTon: toggleRestrictedTop,
          setRestrictedTonAllTrue: setRestrictedTopAllTrue,
          setRestrictedTonAllFalse: setRestrictedTopAllFalse,
        },
        cargo: {
          restrictedTon: restrictedCargo,
          toggleRestrictedTon: toggleRestrictedCargo,
          setRestrictedTonAllTrue: setRestrictedCargoAllTrue,
          setRestrictedTonAllFalse: setRestrictedCargoAllFalse,
        },
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

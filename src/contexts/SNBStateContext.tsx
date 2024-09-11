"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SNBStateKey = "GLT_SNB_STATE";

const SNBStateDefaultValue = true;

interface SNBStateContextProps {
  isSNBOpened: boolean;
  toggleSNBState: () => void;
}

const SNBStateContext = createContext<SNBStateContextProps | null>(null);

export const SNBStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSNBOpened, setIsSNBOpened] = useState(SNBStateDefaultValue);

  useEffect(() => {
    if (typeof window !== undefined) {
      const value = sessionStorage.getItem(SNBStateKey);
      if (value) {
        setIsSNBOpened(JSON.parse(value));
      }
    }
  }, []);

  const toggleSNBState = useCallback(() => {
    try {
      sessionStorage.setItem(SNBStateKey, JSON.stringify(!isSNBOpened));
      setIsSNBOpened((v) => !v);
    } catch (error) {
      return;
    }
  }, [isSNBOpened]);

  return (
    <SNBStateContext.Provider
      value={{
        isSNBOpened,
        toggleSNBState,
      }}
    >
      {children}
    </SNBStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSNBStateContext = () => {
  const context = useContext(SNBStateContext);
  if (!context) {
    throw new Error("useSNBStateContext는 SNBStateContextProvider 내부에서만 사용해야 합니다.");
  }
  return context;
};

"use client";

import { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const TabStateKey = "GLT_TAB_STATE";

type HrefType = SideNavBarLink["href"];
type NameType = Exclude<SideNavBarLink["name"], "배차관리">;

interface TabInfo {
  href: HrefType;
  name: NameType;
}

interface TabStateContextProps {
  tabStates: TabInfo[];
  addTab: (href: HrefType, name: NameType) => void;
  removeTab: (name: NameType) => void;
}

const TabStateContext = createContext<TabStateContextProps | null>(null);

export const TabStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabStates, setTabStates] = useState<TabInfo[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const jsonValue = sessionStorage.getItem(TabStateKey);
      if (jsonValue) {
        const value = JSON.parse(jsonValue) as TabInfo[];
        setTabStates(value);
      }
    }
  }, []);

  const addTab = useCallback(
    (href: HrefType, name: NameType) => {
      if (tabStates.length >= 4) return;
      if (tabStates.some((tabState) => tabState.href === href)) return;

      try {
        sessionStorage.setItem(TabStateKey, JSON.stringify([...tabStates, { href, name }]));
        setTabStates((prev) => [...prev, { href, name }]);
      } catch (error) {
        return;
      }
    },
    [tabStates],
  );

  const removeTab = useCallback(
    (name: NameType) => {
      if (tabStates.length <= 1) return;
      const index = tabStates.findIndex((tabState) => tabState.name === name);

      try {
        sessionStorage.setItem(
          TabStateKey,
          JSON.stringify([...tabStates.slice(0, index), ...tabStates.slice(index + 1, -1)]),
        );
        setTabStates((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, -1)]);
      } catch (error) {
        return;
      }
    },
    [tabStates],
  );

  return (
    <TabStateContext.Provider
      value={{
        tabStates,
        addTab,
        removeTab,
      }}
    >
      {children}
    </TabStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTabStateContext = () => {
  const context = useContext(TabStateContext);
  if (!context) {
    throw new Error("useTabStateContext는 TabStateContextProvider 내부에서만 사용해야 합니다.");
  }
  return context;
};

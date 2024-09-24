"use client";

import { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import useFullUrl from "@/hooks/useFullUrl";
import { urlToName } from "@/utils/nav";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const TabStateKey = "GLT_TAB_STATE";

type HrefType = SideNavBarLink["href"];
export type NameType = Exclude<SideNavBarLink["name"], "배차관리">;

export interface TabInfo {
  href: HrefType;
  name: NameType;
}

interface TabStateContextProps {
  tabStates: TabInfo[] | null;
  removeTab: (name: NameType) => void;
  resetTabState: () => void;
}

const TabStateContext = createContext<TabStateContextProps | null>(null);

export const TabStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabStates, setTabStates] = useState<TabInfo[] | null>(null);
  const fullUrl = useFullUrl();

  useEffect(() => {
    if (typeof window !== undefined) {
      const jsonValue = sessionStorage.getItem(TabStateKey);

      if (jsonValue) {
        const value = JSON.parse(jsonValue) as TabInfo[];
        setTabStates(value);
      } else {
        sessionStorage.setItem(TabStateKey, JSON.stringify([]));
        setTabStates([]);
      }
    }
  }, []);

  const addTab = useCallback(
    (href: HrefType, name: NameType) => {
      if (!tabStates) return;

      if (tabStates.length >= 4) return;

      try {
        sessionStorage.setItem(TabStateKey, JSON.stringify([...tabStates, { href, name }]));
        setTabStates([...tabStates, { href, name }]);
      } catch (error) {
        return;
      }
    },
    [tabStates],
  );

  const removeTab = useCallback(
    (name: NameType) => {
      if (!tabStates) return;

      if (tabStates.length <= 0) return;
      const index = tabStates.findIndex((tabState) => tabState.name === name);

      try {
        sessionStorage.setItem(
          TabStateKey,
          JSON.stringify([...tabStates.slice(0, index), ...tabStates.slice(index + 1, -1)]),
        );
        setTabStates([...tabStates.slice(0, index), ...tabStates.slice(index + 1, -1)]);
      } catch (error) {
        return;
      }
    },
    [tabStates],
  );

  const updateTab = useCallback(
    (href: HrefType, name: NameType) => {
      if (!tabStates) return;

      if (tabStates.length <= 0) return;
      const updatedTabStates = tabStates.map((tabState) => {
        if (tabState.name === name) {
          return {
            href,
            name,
          };
        }
        return tabState;
      });

      try {
        sessionStorage.setItem(TabStateKey, JSON.stringify(updatedTabStates));
        setTabStates(updatedTabStates);
      } catch (error) {
        return;
      }
    },
    [tabStates],
  );

  const resetTabState = useCallback(() => {
    try {
      sessionStorage.removeItem(TabStateKey);
      setTabStates(null);
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    const urlName = urlToName(fullUrl);

    if (!urlName) return;
    if (!tabStates) return;
    if (tabStates.some((tabState) => tabState.href === fullUrl)) {
      return;
    }

    if (tabStates.some((tabState) => tabState.name === urlName)) {
      updateTab(fullUrl, urlName);
    } else {
      addTab(fullUrl, urlName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullUrl]);

  return (
    <TabStateContext.Provider
      value={{
        tabStates,
        removeTab,
        resetTabState,
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

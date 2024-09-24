"use client";

import GlobalNavBarTabItem from "@/components/GlobalNavBar/GlobalNavBarTabItem";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";
import { useMyMenus } from "@/hooks/useMyMenus";

const GlobalNavBarTabList = () => {
  const { tabStates } = useTabStateContext();
  const { myMenus } = useMyMenus();

  return (
    <div className="flex h-full items-end">
      {tabStates && (
        <>
          <GlobalNavBarTabItem
            key={DEFAULT_TAB.name}
            tabName={DEFAULT_TAB.name}
            href={DEFAULT_TAB.href}
            isMyMenu={myMenus.includes(DEFAULT_TAB.name)}
          />
          {tabStates.map(({ href, name }) => {
            return <GlobalNavBarTabItem key={name} tabName={name} href={href} isMyMenu={myMenus.includes(name)} />;
          })}
        </>
      )}
    </div>
  );
};

export default GlobalNavBarTabList;

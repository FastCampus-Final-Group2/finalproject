"use client";

import GlobalNavBarTabItem from "@/components/GlobalNavBar/GlobalNavBarTabItem";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";

const GlobalNavBarTabList = () => {
  const { tabStates } = useTabStateContext();

  return (
    <div className="flex h-full items-end">
      <GlobalNavBarTabItem key={DEFAULT_TAB.name} tabName={DEFAULT_TAB.name} href={DEFAULT_TAB.href} />
      {tabStates.map(({ href, name }) => {
        return <GlobalNavBarTabItem key={name} tabName={name} href={href} />;
      })}
    </div>
  );
};

export default GlobalNavBarTabList;

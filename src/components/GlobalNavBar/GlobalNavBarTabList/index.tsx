"use client";

import GlobalNavBarTabItem from "@/components/GlobalNavBar/GlobalNavBarTabItem";
import { useTabStateContext } from "@/contexts/TabStateContext";

const GlobalNavBarTabList = () => {
  const { tabStates } = useTabStateContext();

  return (
    <div className="flex h-full items-end">
      {tabStates.map(({ href, name }) => {
        return <GlobalNavBarTabItem key={name} tabName={name} href={href} />;
      })}
    </div>
  );
};

export default GlobalNavBarTabList;

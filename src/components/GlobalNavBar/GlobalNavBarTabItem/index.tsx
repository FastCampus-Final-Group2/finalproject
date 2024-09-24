"use client";

import Icon from "@/components/core/Icon";
import type { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { useRouter } from "next/navigation";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";
import { useMyMenus } from "@/hooks/useMyMenus";
import { useCallback } from "react";
import type { MouseEventHandler } from "react";
import { cn } from "@/utils/cn";
import { gnbTabContentVariants, gnbTabToggleIconVariants, gnbTabVariants } from "./index.variants";
import useResetControlAtoms from "@/hooks/useResetControlAtoms";
import { replaceUrl } from "@/utils/nav";
import useFullUrl from "@/hooks/useFullUrl";

interface GlobalNavBarTabItem {
  tabName: SideNavBarLink["name"];
  href: SideNavBarLink["href"];
  isMyMenu: boolean;
}

const GlobalNavBarTabItem = ({ isMyMenu, href, tabName }: GlobalNavBarTabItem) => {
  const { tabStates, removeTab } = useTabStateContext();
  const resetControlAtoms = useResetControlAtoms();
  const router = useRouter();
  const fullUrl = useFullUrl();
  const isPageOpened = fullUrl === "/dispatch/manual" ? replaceUrl(fullUrl) === href : fullUrl === href;
  const { addMyMenu, removeMyMenu } = useMyMenus();

  const handleToggleMyMenuButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      if (isMyMenu) removeMyMenu(tabName);
      else addMyMenu(tabName);
    },
    [addMyMenu, isMyMenu, removeMyMenu, tabName],
  );

  const handleClickCloseButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();

      if (!tabStates) return;
      if (tabName === "배차관리") return;

      removeTab(tabName);
      if (tabName === "차량관제") resetControlAtoms();

      // TODO
      if (tabStates.length === 1) router.push("/dispatch");
    },
    [removeTab, resetControlAtoms, router, tabName, tabStates],
  );

  return (
    <div
      role="button"
      onClick={() => {
        if (!href) return;
        router.push(href);
      }}
      className={cn(gnbTabVariants({ isPageOpened }))}
    >
      <div className={cn(gnbTabContentVariants({ isPageOpened }))}>
        {tabName}
        <button type="button" onClick={handleToggleMyMenuButton}>
          <Icon
            id={isMyMenu ? "starFill" : "star"}
            size={18}
            className={cn(gnbTabToggleIconVariants({ isPageOpened }))}
          />
        </button>
      </div>
      {tabName !== DEFAULT_TAB.name && (
        <button type="button" className="py-[1px]" onClick={handleClickCloseButton}>
          <Icon id="x" size={20} className="text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default GlobalNavBarTabItem;

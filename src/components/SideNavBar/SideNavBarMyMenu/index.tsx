"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { useCallback, useReducer } from "react";
import SideNavBarSubMenu from "@/components/SideNavBar/SideNavBarSubMenu";
import { useMyMenus } from "@/hooks/useMyMenus";
import { cn } from "@/utils/cn";
import { snbMyMenuContainerVariants, snbMyMenuVariants, snbMySubMenuContainerVariants } from "./index.variants";
import { NAV_LINK_MAP } from "@/components/SideNavBar/index.constants";

const SideNavBarMyMenu = () => {
  const [isMyMenuOpened, toggleMyMenu] = useReducer((v) => !v, false);
  const { isSNBOpened } = useSNBStateContext();
  const { myMenus } = useMyMenus();

  const handleMyMenuToggleButton = useCallback(() => {
    if (!isSNBOpened) return;
    toggleMyMenu();
  }, [isSNBOpened]);

  return (
    <div className={cn(snbMyMenuContainerVariants({ isSNBOpened }))}>
      <button className={cn(snbMyMenuVariants({ isSNBOpened }))} type="button" onClick={handleMyMenuToggleButton}>
        <Icon id="starFill" size={isSNBOpened ? 20 : 24} className="text-white group-hover:text-blue-500" />
        {isSNBOpened && (
          <>
            <span className="flex w-[92px] text-white text-T-18-B group-hover:text-blue-500">My Menu</span>
            <Icon id={isMyMenuOpened ? "arrowUp" : "arrowDown"} size={20} className="text-white" />
          </>
        )}
      </button>
      {isSNBOpened && (
        <div className={cn(snbMySubMenuContainerVariants({ isMyMenuOpened }))}>
          {myMenus?.map((name) => {
            return (
              <SideNavBarSubMenu key={name} subMenuName={name} href={NAV_LINK_MAP[name as keyof typeof NAV_LINK_MAP]} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideNavBarMyMenu;

"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { usePathname, useRouter } from "next/navigation";
import { useTabStateContext } from "@/contexts/TabStateContext";
import type { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import SideNavBarSubMenu from "@/components/SideNavBar/SideNavBarSubMenu";
import { useCallback, useReducer } from "react";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";
import { cn } from "@/utils/cn";
import {
  snbMenuContainerVariants,
  snbMenuIconVariants,
  snbMenuNameVariants,
  snbMenuVariants,
  snbSubMenuContainerVariants,
} from "./index.variants";

interface SideNavBarMenuProps {
  SideNavBarInfo: SideNavBarLink;
  currentMenu: SideNavBarLink["name"];
  setCurrentMenu: React.Dispatch<React.SetStateAction<SideNavBarLink["name"]>>;
}

const SideNavBarMenu = ({
  SideNavBarInfo: { iconId, name, href, subMenu },
  currentMenu,
  setCurrentMenu,
}: SideNavBarMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addTab } = useTabStateContext();
  const { isSNBOpened } = useSNBStateContext();
  const isPageOpened = href && pathname === href ? true : false;
  const [isMenuOpened, toggleMenu] = useReducer((v) => !v, false);

  const handleMenuToggleButton = useCallback(() => {
    if (subMenu) {
      setCurrentMenu(name);
      toggleMenu();
    } else {
      if (!href) return;
      if (!isSNBOpened) return;
      if (name !== DEFAULT_TAB.name) {
        addTab(href, name);
      }

      router.push(href);
    }
  }, [addTab, href, isSNBOpened, name, router, setCurrentMenu, subMenu]);

  return (
    <div className={cn(snbMenuContainerVariants({ isSNBOpened }))}>
      <button
        type="button"
        className={cn(snbMenuVariants({ isSNBOpened, isPageOpened }))}
        onClick={handleMenuToggleButton}
      >
        <Icon id={iconId} size={isSNBOpened ? 20 : 24} className={cn(snbMenuIconVariants({ isPageOpened }))} />
        {isSNBOpened && (
          <>
            <span className={cn(snbMenuNameVariants({ isPageOpened }))}>{name}</span>
            {subMenu ? (
              <Icon id={isMenuOpened ? "arrowUp" : "arrowDown"} size={20} className="text-white" />
            ) : (
              <div className="h-5 w-5" aria-hidden />
            )}
          </>
        )}
      </button>
      {isSNBOpened && currentMenu === name && (
        <div className={cn(snbSubMenuContainerVariants({ isMenuOpened }))}>
          {subMenu?.map(({ name }) => {
            return <SideNavBarSubMenu key={name} subMenuName={name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SideNavBarMenu;

"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { usePathname, useRouter } from "next/navigation";
import { useTabStateContext } from "@/contexts/TabStateContext";
import type { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import SideNavBarSubMenu from "@/components/SideNavBar/SideNavBarSubMenu";
import { useCallback, useReducer } from "react";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";

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
  const isPageOpened = href && pathname === href;
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
    <div className={isSNBOpened ? "py-[2px] pl-[25px] pr-4" : "flex justify-center"}>
      <button
        type="button"
        className={`group flex items-center gap-2 rounded-full hover:bg-white ${isSNBOpened ? "py-[7px] pl-[15px] pr-5" : "justify-center p-2"} ${isPageOpened && "bg-white"}`}
        onClick={handleMenuToggleButton}
      >
        <Icon
          id={iconId}
          size={isSNBOpened ? 20 : 24}
          className={`-translate-x-[1px] group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
        />
        {isSNBOpened && (
          <>
            <span
              className={`flex w-[92px] truncate text-T-18-B group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
            >
              {name}
            </span>
            {subMenu ? (
              <Icon id={isMenuOpened ? "arrowUp" : "arrowDown"} size={20} className="text-white" />
            ) : (
              <div className="h-5 w-5" aria-hidden />
            )}
          </>
        )}
      </button>
      {isSNBOpened && currentMenu === name && (
        <div
          className={`overflow-hidden transition-[height] duration-[10000] ${isMenuOpened || isPageOpened ? "h-max" : "h-0"}`}
        >
          {subMenu?.map(({ name }) => {
            return <SideNavBarSubMenu key={name} subMenuName={name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SideNavBarMenu;

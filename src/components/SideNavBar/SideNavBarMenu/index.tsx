"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { usePathname, useRouter } from "next/navigation";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import SideNavBarSubMenu from "@/components/SideNavBar/SideNavBarSubMenu";
import { useReducer } from "react";

interface SideNavBarMenuProps {
  SideNavBarInfo: SideNavBarLink;
}

const SideNavBarMenu = ({ SideNavBarInfo: { iconId, name, href, subMenu } }: SideNavBarMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addTab } = useTabStateContext();
  const { isSNBOpened } = useSNBStateContext();
  const isPageOpened = href && pathname === href;
  const [isMenuOpened, toggleMenu] = useReducer((v) => !v, false);

  return (
    <div className={isSNBOpened ? "py-[2px] pl-[25px] pr-4" : "flex justify-center"}>
      <button
        type="button"
        className={`group flex items-center gap-2 rounded-full hover:bg-white ${isSNBOpened ? "py-[7px] pl-[15px] pr-5" : "justify-center p-2"} ${isPageOpened && "bg-white"}`}
        onClick={() => {
          if (subMenu) {
            toggleMenu();
          } else {
            if (!href) return;
            if (!isSNBOpened) return;

            addTab(href, name);
            router.push(href);
          }
        }}
      >
        <Icon
          id={iconId}
          size={isSNBOpened ? 20 : 24}
          className={`-translate-x-[1px] group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
        />
        {isSNBOpened && (
          <>
            <span
              className={`flex w-[92px] text-T-18-B group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
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
      {isSNBOpened && (
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

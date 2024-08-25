"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { useReducer } from "react";
import SideNavBarSubMenu from "@/components/SideNavBar/SideNavBarSubMenu";
import { useMyMenus } from "@/hooks/useMyMenus";

const SideNavBarMyMenu = () => {
  const [isMyMenuOpened, toggleMyMenu] = useReducer((v) => !v, false);
  const { isSNBOpened } = useSNBStateContext();
  const { myMenus } = useMyMenus();

  return (
    <div className={isSNBOpened ? "py-[2px] pl-[25px] pr-4" : "flex justify-center"}>
      <button
        className={`group flex items-center gap-2 rounded-full hover:bg-white ${isSNBOpened ? "py-[7px] pl-[15px] pr-5" : "justify-center p-2"}`}
        type="button"
        onClick={toggleMyMenu}
      >
        <Icon id="starFill" size={isSNBOpened ? 20 : 24} className="text-white group-hover:text-blue-500" />
        {isSNBOpened && (
          <>
            <span className="flex w-[92px] text-white text-T-18-B group-hover:text-blue-500">My Menu</span>
            <Icon id={isMyMenuOpened ? "arrowUp" : "arrowDown"} size={20} className="text-white" />
          </>
        )}
      </button>
      {isSNBOpened && (
        <div className={`overflow-hidden transition-[height] duration-[10000] ${isMyMenuOpened ? "h-max" : "h-0"}`}>
          {myMenus?.map((name) => {
            return <SideNavBarSubMenu key={name} subMenuName={name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SideNavBarMyMenu;

"use client";

import { SIDE_NAV_BAR_LINKS, SideNavBarLink } from "@/components/SideNavBar/index.constants";
import SideNavBarMenu from "@/components/SideNavBar/SideNavBarMenu";
import SideNavBarMyMenu from "@/components/SideNavBar/SideNavBarMyMenu";
import { useState } from "react";

const SideNavBarList = () => {
  const [currentMenu, setCurrentMenu] = useState<SideNavBarLink["name"]>("배차관리");

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <SideNavBarMyMenu />
        <div className="h-[2px] w-full bg-gray-800" aria-hidden />
        {SIDE_NAV_BAR_LINKS.slice(0, -1).map((info) => {
          return (
            <SideNavBarMenu
              key={info.name}
              SideNavBarInfo={info}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
            />
          );
        })}
      </div>
      <SideNavBarMenu
        SideNavBarInfo={SIDE_NAV_BAR_LINKS[SIDE_NAV_BAR_LINKS.length - 1]}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
      />
    </div>
  );
};

export default SideNavBarList;

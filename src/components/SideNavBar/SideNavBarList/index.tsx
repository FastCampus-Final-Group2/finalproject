"use client";

import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";
import SideNavBarMenu from "@/components/SideNavBar/SideNavBarMenu";
import SideNavBarMyMenu from "@/components/SideNavBar/SideNavBarMyMenu";

const SideNavBarList = () => {
  return (
    <div className="flex flex-1 flex-col justify-between overflow-hidden">
      <div className="flex flex-1 flex-col gap-5">
        <SideNavBarMyMenu />
        <div className="h-[2px] w-full bg-gray-800" aria-hidden />
        {SIDE_NAV_BAR_LINKS.slice(0, -1).map((info) => {
          return <SideNavBarMenu key={info.name} SideNavBarInfo={info} />;
        })}
      </div>
      <SideNavBarMenu SideNavBarInfo={SIDE_NAV_BAR_LINKS[SIDE_NAV_BAR_LINKS.length - 1]} />
    </div>
  );
};

export default SideNavBarList;

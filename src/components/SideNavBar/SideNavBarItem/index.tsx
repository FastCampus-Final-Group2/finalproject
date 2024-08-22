"use client";

import Icon from "@/components/core/Icon";
import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { useRouter } from "next/navigation";

interface SideNavBarItemProps {
  SideNavBarInfo: (typeof SIDE_NAV_BAR_LINKS)[number];
}

const SideNavBarItem = ({ SideNavBarInfo: { iconId, name, href, isOpenable } }: SideNavBarItemProps) => {
  const router = useRouter();
  const { isSNBOpened } = useSNBStateContext();

  return (
    <div className={isSNBOpened ? "py-[2px] pl-[25px] pr-4" : "flex justify-center"}>
      <button
        type="button"
        className={`group flex items-center gap-2 rounded-full hover:bg-white ${isSNBOpened ? "py-[7px] pl-[15px] pr-5" : "p-2"}`}
        onClick={() => router.push(href)}
      >
        <Icon id={iconId} size={isSNBOpened ? 20 : 24} className="text-white group-hover:text-blue-500" />
        {isSNBOpened && (
          <>
            <span className="w-[92px] text-white text-T-18-B group-hover:text-blue-500">{name}</span>
            {isOpenable && <Icon id="arrowDown" size={20} className="text-white" />}
          </>
        )}
      </button>
    </div>
  );
};

export default SideNavBarItem;

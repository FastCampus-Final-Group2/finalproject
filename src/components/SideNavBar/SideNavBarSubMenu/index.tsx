"use client";

import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { useRouter } from "next/navigation";

interface SideNavBarSubMenu {
  subMenuName: string;
  href?: string;
}

const SideNavBarSubMenu = ({ subMenuName, href }: SideNavBarSubMenu) => {
  const { tabStates } = useTabStateContext();
  const { isSNBOpened } = useSNBStateContext();
  const router = useRouter();

  const handleClickSubMenu = () => {
    if (!isSNBOpened) return;

    if (!href) return;

    const url = tabStates?.find((tabState) => tabState.name === subMenuName)?.href;

    if (url) router.push(url);
    else router.push(href);
  };

  return (
    <div className="py-0.5 pl-6 pr-4">
      <div
        role="button"
        className="cursor-pointer truncate rounded-full py-[7px] pl-4 text-white text-T-18-M hover:bg-white hover:text-blue-500"
        onClick={handleClickSubMenu}
      >
        {subMenuName}
      </div>
    </div>
  );
};

export default SideNavBarSubMenu;

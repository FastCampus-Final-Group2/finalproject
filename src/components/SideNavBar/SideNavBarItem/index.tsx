import Link from "next/link";
import Icon from "@/components/core/Icon";
import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";

interface SideNavBarItemProps {
  SideNavBarInfo: (typeof SIDE_NAV_BAR_LINKS)[number];
}

const SideNavBarItem = ({ SideNavBarInfo: { iconId, name, href, isOpenable } }: SideNavBarItemProps) => {
  return (
    <div className="py-[2px] pl-[25px] pr-4">
      <Link href={href} className="group flex items-center gap-2 rounded-full py-[7px] pl-[15px] pr-5 hover:bg-white">
        <Icon id={iconId} size={20} className="text-white group-hover:text-blue-500" />
        <span className="w-[92px] text-white text-T-18-B group-hover:text-blue-500">{name}</span>
        {isOpenable && <Icon id="arrowDown" size={20} className="text-white" />}
      </Link>
    </div>
  );
};

export default SideNavBarItem;

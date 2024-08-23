import Icon from "@/components/core/Icon";
import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";
import { useTabStateContext } from "@/contexts/TabStateContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GlobalNavBarTabItem {
  tabName: (typeof SIDE_NAV_BAR_LINKS)[number]["name"];
  href: (typeof SIDE_NAV_BAR_LINKS)[number]["href"];
  isMyMenu?: boolean;
}

const GlobalNavBarTabItem = ({ isMyMenu = false, href, tabName }: GlobalNavBarTabItem) => {
  const { removeTab } = useTabStateContext();
  const pathname = usePathname();
  const isPageOpened = pathname === href;

  return (
    <Link
      href={href}
      className={`group flex cursor-pointer items-center gap-5 rounded-t-lg border border-gray-700 py-[15px] pl-[17px] pr-4 ${isPageOpened ? "border-white bg-white" : "hover:border-white hover:bg-white"}`}
    >
      <div
        className={`flex flex-1 items-center gap-1 text-T-18-B ${isPageOpened ? "text-blue-500" : "text-gray-700 group-hover:text-blue-500"}`}
      >
        {tabName}
        {isMyMenu ? (
          <Icon
            id="starFill"
            size={18}
            className={`group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-gray-700"}`}
          />
        ) : (
          <Icon
            id="star"
            size={18}
            className={`text-gray-700 group-hover:text-blue-100 ${isPageOpened ? "text-blue-100" : "text-gray-700"}`}
          />
        )}
      </div>
      <button
        type="button"
        className="py-[1px]"
        onClick={(event) => {
          event.stopPropagation();
          removeTab(href);
        }}
      >
        <Icon id="x" size={20} className="text-gray-700" />
      </button>
    </Link>
  );
};

export default GlobalNavBarTabItem;

import Icon from "@/components/core/Icon";
import type { SideNavBarLink } from "@/components/SideNavBar/index.constants";
import { useTabStateContext } from "@/contexts/TabStateContext";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_TAB } from "@/components/GlobalNavBar/index.constants";

interface GlobalNavBarTabItem {
  tabName: SideNavBarLink["name"];
  href: SideNavBarLink["href"];
  isMyMenu?: boolean;
}

const GlobalNavBarTabItem = ({ isMyMenu = false, href, tabName }: GlobalNavBarTabItem) => {
  const { removeTab } = useTabStateContext();
  const router = useRouter();
  const pathname = usePathname();
  const isPageOpened = pathname === href;

  return (
    <button
      type="button"
      onClick={() => {
        if (!href) return;
        router.push(href);
      }}
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
            className={`group-hover:text-blue-100 ${isPageOpened ? "text-blue-100" : "text-gray-700"}`}
          />
        )}
      </div>
      {tabName !== DEFAULT_TAB.name && (
        <button
          type="button"
          className="py-[1px]"
          onClick={(event) => {
            event.stopPropagation();
            removeTab(tabName);
          }}
        >
          <Icon id="x" size={20} className="text-gray-700" />
        </button>
      )}
    </button>
  );
};

export default GlobalNavBarTabItem;

import Icon from "@/components/core/Icon";

interface GlobalNavBarTabItem {
  tabName: string;
  isMyMenu?: boolean;
}

const GlobalNavBarTabItem = ({ isMyMenu = false, tabName }: GlobalNavBarTabItem) => {
  return (
    <div className="group flex cursor-pointer items-center gap-5 rounded-t-lg border border-gray-700 py-[15px] pl-[17px] pr-4 hover:border-white hover:bg-white">
      <div className="flex flex-1 items-center gap-1 text-gray-700 text-T-18-B group-hover:text-blue-500">
        {tabName}
        {isMyMenu ? (
          <Icon id="starFill" size={18} className="text-gray-700 group-hover:text-blue-500" />
        ) : (
          <Icon id="star" size={18} className="text-gray-700 group-hover:text-blue-100" />
        )}
      </div>
      <Icon id="x" size={20} className="text-gray-700" />
    </div>
  );
};

export default GlobalNavBarTabItem;

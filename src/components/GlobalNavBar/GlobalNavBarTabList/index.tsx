import GlobalNavBarTabItem from "@/components/GlobalNavBar/GlobalNavBarTabItem";

const GlobalNavBarTabList = () => {
  return (
    <div className="flex h-full items-end">
      <GlobalNavBarTabItem tabName="배차관리" isMyMenu={true} />
      <GlobalNavBarTabItem tabName="차량관리" />
    </div>
  );
};

export default GlobalNavBarTabList;

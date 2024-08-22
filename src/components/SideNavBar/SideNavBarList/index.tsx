import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";
import SideNavBarItem from "@/components/SideNavBar/SideNavBarItem";
import SideNavBarMyMenu from "@/components/SideNavBar/SideNavBarMyMenu";

const SideNavBarList = () => {
  return (
    <>
      <SideNavBarMyMenu />
      <div className="h-[2px] w-full bg-gray-800" aria-hidden />
      {SIDE_NAV_BAR_LINKS.map((info) => {
        return <SideNavBarItem key={info.name} SideNavBarInfo={info} />;
      })}
    </>
  );
};

export default SideNavBarList;

import GlobalNavBarTabList from "./GlobalNavBarTabList";
import ProfileBadge from "./ProfileBadge";

const GlobalNavBar = () => {
  return (
    <nav className="z-nav flex h-gnb items-center justify-between bg-gray-900 pr-10">
      <GlobalNavBarTabList />
      <ProfileBadge />
    </nav>
  );
};

export default GlobalNavBar;

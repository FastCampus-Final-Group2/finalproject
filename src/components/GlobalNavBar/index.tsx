import ProfileBadge from "./ProfileBadge";

const GlobalNavBar = () => {
  return (
    <nav className="flex h-gnb justify-between bg-gray-900 p-10">
      <div>페이지 탭</div>
      <ProfileBadge />
    </nav>
  );
};

export default GlobalNavBar;

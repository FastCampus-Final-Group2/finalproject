interface SideNavBarSubMenu {
  subMenuName: string;
}

const SideNavBarSubMenu = ({ subMenuName }: SideNavBarSubMenu) => {
  return (
    <div className="py-0.5 pl-6 pr-4">
      <div className="cursor-pointer truncate rounded-full py-[7px] pl-4 text-white text-T-18-M hover:bg-white hover:text-blue-500">
        {subMenuName}
      </div>
    </div>
  );
};

export default SideNavBarSubMenu;

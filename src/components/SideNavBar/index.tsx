import Image from "next/image";
import Link from "next/link";
import SideNavBarList from "./SideNavBarList";
import SideNavBarToggleButton from "./SideNavBarToggleButton";

const SideNavBar = () => {
  return (
    <nav className="z-nav relative flex w-snb-open flex-col gap-5 bg-gray-900 pb-[60px]">
      <div className="px-10 py-9">
        <Link href="/">
          <Image src="/logo_snb_open.png" alt="GLT Korea Logo" width={144} height={48} />
        </Link>
      </div>
      <SideNavBarList />
      <SideNavBarToggleButton />
    </nav>
  );
};

export default SideNavBar;

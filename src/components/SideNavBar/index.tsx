import Image from "next/image";
import Link from "next/link";
import SideNavBarList from "./SideNavBarList";

const SideNavBar = () => {
  return (
    <nav className="flex w-snb-open flex-col gap-5 bg-gray-900">
      <div className="px-10 py-9">
        <Link href="/">
          <Image src="/logo_snb_open.png" alt="GLT Korea Logo" width={144} height={48} />
        </Link>
      </div>
      <SideNavBarList />
    </nav>
  );
};

export default SideNavBar;

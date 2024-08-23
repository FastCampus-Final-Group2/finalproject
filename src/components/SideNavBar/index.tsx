"use client";

import SideNavBarList from "./SideNavBarList";
import SideNavBarToggleButton from "./SideNavBarToggleButton";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import Image from "next/image";

const SideNavBar = () => {
  const { isSNBOpened } = useSNBStateContext();

  return (
    <nav
      className={`relative z-nav flex flex-col gap-5 bg-gray-900 pb-[60px] transition-[width] duration-500 ${isSNBOpened ? "w-snb-open" : "w-snb-close"}`}
    >
      <div className={`h-[120px] ${isSNBOpened ? "px-10 py-9" : "px-5 py-[44px]"}`}>
        <div className="flex items-center justify-center">
          {isSNBOpened ? (
            <Image src="/logo_snb_open.png" alt="GLT Korea Logo" width={144} height={48} />
          ) : (
            <Image src="/logo_snb_close.png" alt="GLT Korea Logo" width={32} height={32} />
          )}
        </div>
      </div>
      <SideNavBarList />
      <SideNavBarToggleButton />
    </nav>
  );
};

export default SideNavBar;

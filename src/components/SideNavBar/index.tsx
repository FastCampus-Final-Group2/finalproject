"use client";

import Image from "next/image";
import SideNavBarList from "./SideNavBarList";
import SideNavBarToggleButton from "./SideNavBarToggleButton";
import { cn } from "@/utils/cn";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { logoVariants, snbVariants } from "./index.variants";

const SideNavBar = () => {
  const { isSNBOpened } = useSNBStateContext();

  return (
    <nav className={cn(snbVariants({ isSNBOpened }))}>
      <div className={cn(logoVariants({ isSNBOpened }))}>
        <div className="flex items-center justify-center">
          {isSNBOpened ? (
            <Image src="/logo_snb_open.png" alt="GLT Korea Logo" width={144} height={48} priority />
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

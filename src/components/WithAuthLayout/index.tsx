"use client";

import GlobalNavBar from "@/components/GlobalNavBar";
import SideNavBar from "@/components/SideNavBar";
import { cn } from "@/utils/cn";
import { mainVariants } from "./index.variants";
import { useSNBStateContext } from "@/contexts/SNBStateContext";

interface WithAuthLayoutProps {
  children?: React.ReactNode;
}

const WithAuthLayout = ({ children }: WithAuthLayoutProps) => {
  const { isSNBOpened } = useSNBStateContext();

  return (
    <div className="flex h-full w-full">
      <SideNavBar />
      <div className="flex-grow">
        <GlobalNavBar />
        <main className={cn(mainVariants({ isSNBOpened }))}>{children}</main>
      </div>
    </div>
  );
};

export default WithAuthLayout;

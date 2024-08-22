"use client";

import Icon from "@/components/core/Icon";
import { SIDE_NAV_BAR_LINKS } from "@/components/SideNavBar/index.constants";
import { useSNBStateContext } from "@/contexts/SNBStateContext";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants, containerVariants, iconVariants } from "./index.variants";

interface SideNavBarItemProps {
  SideNavBarInfo: (typeof SIDE_NAV_BAR_LINKS)[number];
}

const SideNavBarItem = ({ SideNavBarInfo: { iconId, name, href, isOpenable } }: SideNavBarItemProps) => {
  const router = useRouter();
  const { isSNBOpened } = useSNBStateContext();
  const pathname = usePathname();
  const isPageOpened = pathname === href;

  const variants = {
    snb: isSNBOpened ? "open" : "close",
    page: isPageOpened ? "open" : "close",
  } as const;

  return (
    // <div className={isSNBOpened ? "py-[2px] pl-[25px] pr-4" : "flex justify-center"}>
    <div className={cn(containerVariants({ snb: variants.snb }))}>
      <button
        type="button"
        // className={`group flex items-center gap-2 rounded-full hover:bg-white ${isSNBOpened ? "py-[7px] pl-[15px] pr-5" : "p-2"} ${isPageOpened && "bg-white"}`}
        className={cn(buttonVariants({ snb: variants.snb, page: variants.page }))}
        onClick={() => router.push(href)}
      >
        <Icon
          id={iconId}
          size={isSNBOpened ? 20 : 24}
          className={cn(iconVariants({ page: variants.page }))}
          // className={`-translate-x-[1px] group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
        />
        {isSNBOpened && (
          <>
            <span
              // className={cn(labelVariants({ page: variants.page }))}
              className={`w-[92px] text-T-18-B group-hover:text-blue-500 ${isPageOpened ? "text-blue-500" : "text-white"}`}
            >
              {name}
            </span>
            {isOpenable ? (
              <Icon id="arrowDown" size={20} className="text-white" />
            ) : (
              <div className="h-5 w-5" aria-hidden />
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default SideNavBarItem;

"use client";

import Icon from "@/components/core/Icon";
import { useSNBStateContext } from "@/contexts/SNBStateContext";

const SideNavBarToggleButton = () => {
  const { isSNBOpened, toggleSNBState } = useSNBStateContext();

  return (
    <button
      type="button"
      className="group absolute -right-6 top-[708px] flex items-center justify-center rounded-full bg-gray-900 px-3 py-[52px] hover:bg-gray-600"
      onClick={toggleSNBState}
    >
      <Icon
        id={isSNBOpened ? "arrowLargeDoubleLeft" : "arrowLargeDoubleRight"}
        className="text-gray-500 group-hover:text-white"
      />
    </button>
  );
};

export default SideNavBarToggleButton;

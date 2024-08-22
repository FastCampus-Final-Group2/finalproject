"use client";

import Icon from "@/components/core/Icon";
import { useReducer } from "react";

const SideNavBarToggleButton = () => {
  const [isOpened, toggleSideNavBar] = useReducer((v) => !v, false);

  return (
    <button
      type="button"
      className="group absolute -right-6 top-[708px] flex items-center justify-center rounded-full bg-gray-900 px-3 py-[52px] hover:bg-gray-600"
    >
      <Icon
        id={isOpened ? "arrowLargeDoubleLeft" : "arrowLargeDoubleRight"}
        className="text-gray-500 group-hover:text-white"
      />
    </button>
  );
};

export default SideNavBarToggleButton;

"use client";

import Icon from "@/components/core/Icon";
import { useReducer } from "react";

const SideNavBarMyMenu = () => {
  const [isOpened, toggleMyMenu] = useReducer((v) => !v, false);

  return (
    <div className="py-[2px] pl-[25px] pr-4">
      <button
        className="group flex cursor-pointer items-center gap-2 rounded-full py-[7px] pl-[15px] pr-5 hover:bg-white"
        type="button"
        onClick={toggleMyMenu}
      >
        <Icon id="starFill" size={20} className="text-white group-hover:text-blue-500" />
        <span className="w-[92px] text-white text-T-18-B group-hover:text-blue-500">My Menu</span>
        <Icon id={isOpened ? "arrowUp" : "arrowDown"} size={20} className="text-white" />
      </button>
    </div>
  );
};

export default SideNavBarMyMenu;

"use client";

import { DISPATCH_MODE_INFOS } from "@/components/DispatchSelector/index.constants";
import DispatchSelectorItemDetail from "./DispatchSelectorItemDetail";
import Icon from "@/components/core/Icon";
import { useState } from "react";
import FileModal from "@/components/FileModal";

interface DispatchSelectorItemProps {
  dispatchModeInfo: (typeof DISPATCH_MODE_INFOS)[number];
}

const DispatchSelectorItem = ({
  dispatchModeInfo: { title, description, tag, details, isModalOpenable },
}: DispatchSelectorItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="group flex cursor-pointer flex-col gap-5 rounded-2xl bg-white px-[52px] pb-5 pt-10 hover:bg-blue-500"
        onClick={() => isModalOpenable && setModalOpen(true)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-blue-500 text-T-20-B group-hover:text-white">{title}</h3>
          <div className="rounded-full bg-blue-500 px-2 py-[6px] text-white text-B-14-B group-hover:bg-white group-hover:text-blue-500">
            {tag}
          </div>
        </div>
        <p className="text-gray-900 text-B-14-M group-hover:text-white">{description}</p>
        <div className="h-[0.5px] bg-gray-400 group-hover:bg-white" />
        <div className="flex flex-col gap-1">
          {details.map((detail, idx) => {
            return <DispatchSelectorItemDetail key={idx} detail={detail} />;
          })}
        </div>
        <div className="flex w-full justify-end">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-blue-250 group-hover:bg-white">
            <Icon id="arrowFront" size={18} className="text-white group-hover:text-blue-500" />
          </div>
        </div>
      </button>
      {modalOpen && <FileModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default DispatchSelectorItem;

"use client";

import { DISPATCH_MODE_INFOS } from "@/components/DispatchSelector/index.constants";
import Icon from "@/components/core/Icon";
import { useState } from "react";
import FileModal from "@/components/FileModal";
import { cn } from "@/utils/cn";
import { containerVariants, imageVariants, thumbnailVariants, titleVariants } from "./index.variants";
import Image from "next/image";

interface DispatchSelectorItemProps {
  dispatchModeInfo: (typeof DISPATCH_MODE_INFOS)[number];
}

const DispatchSelectorItem = ({
  dispatchModeInfo: { titles, description, label, disabled, thumbnail, videos },
}: DispatchSelectorItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(containerVariants({ disabled }))}
        disabled={disabled}
        onClick={() => !disabled && setModalOpen(true)}
      >
        <div className="flex w-full flex-col gap-6 px-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              {titles.map((title, index) => {
                return (
                  <p key={index} className={cn(titleVariants({ disabled }))}>
                    {title}
                  </p>
                );
              })}
            </div>
            {disabled ? (
              <Icon id="circleAlertFill" size={40} className="text-gray-700" />
            ) : (
              <div className="flex h-[41px] cursor-pointer items-center justify-center rounded-4 bg-blue-500 px-3 py-3 text-white text-SB-14-B">
                {label}
              </div>
            )}
          </div>
          <p className="self-start text-gray-600 text-T-16-M">{description}</p>
        </div>
        <div className={cn(thumbnailVariants({ disabled }))}>
          <Image
            src={thumbnail}
            alt={`${label} thumbnail`}
            width={560}
            height={360}
            className={cn(imageVariants({ disabled }))}
            priority
          />
          {!disabled && (
            <video width={560} height={360} autoPlay muted loop className="hidden group-hover:block">
              {videos?.map(({ src, type }, index) => {
                return <source src={src} type={type} key={index} />;
              })}
            </video>
          )}
        </div>
      </button>
      {modalOpen && <FileModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default DispatchSelectorItem;

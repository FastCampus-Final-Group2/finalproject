"use client";

import Icon from "@/components/core/Icon";

const ProfileBadge = () => {
  // TODO
  const handleClickLogoutBtn = async () => {};

  return (
    <div className="flex items-center">
      <button type="button" className="p-2">
        <Icon id="setting" size={20} className="text-white" />
      </button>
      <div className="mr-2 h-5 w-[1px] bg-gray-800" />
      <div className="flex items-center gap-1 px-1 py-2">
        <Icon id="profile" size={20} className="text-white" />
        <span className="h-5 pb-[1px] pt-[2px] text-white text-SB-14-M">서울센터 관리자님</span>
      </div>
      <button type="button" className="p-2" onClick={handleClickLogoutBtn}>
        <Icon id="logout" size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ProfileBadge;

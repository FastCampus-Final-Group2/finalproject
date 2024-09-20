"use client";

import { UsersAPI } from "@/apis/users";
import { userState } from "@/atoms/user";
import Icon from "@/components/core/Icon";
import useOnlyClient from "@/hooks/useOnlyClient";
import useResetExcelDataAtoms from "@/hooks/useResetExcelDataAtoms";
import useResetControlAtoms from "@/hooks/useResetControlAtoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useTabStateContext } from "@/contexts/TabStateContext";
import useResetDispatchManualAtoms from "@/hooks/useResetDispatchManualAtoms";
import { dispatchRouterState } from "@/atoms/dispatchRouter";

const ProfileBadge = () => {
  const isClient = useOnlyClient();

  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const resetExcelDataAtoms = useResetExcelDataAtoms();
  const resetControlAtoms = useResetControlAtoms();
  const resetDispatchManualAtoms = useResetDispatchManualAtoms();
  const resetDispatchRouter = useResetRecoilState(dispatchRouterState);
  const { resetTabState } = useTabStateContext();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleClickLogoutBtn = async () => {
    await UsersAPI.logout();

    resetExcelDataAtoms();
    resetDispatchManualAtoms();
    resetDispatchRouter();
    resetControlAtoms();
    resetTabState();
    setUser(null);
    router.push("/");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center">
      <button type="button" className="p-2">
        <Icon id="setting" size={20} className="text-white" />
      </button>
      <div className="mr-2 h-5 w-[1px] bg-gray-800" />
      <div className="flex items-center gap-1 px-1 py-2">
        <Icon id="profile" size={20} className="text-white" />
        <span className="h-5 pb-[1px] pt-[2px] text-white text-SB-14-M">{`${user}님`}</span>
      </div>
      <button type="button" className="p-2" onClick={handleClickLogoutBtn}>
        <Icon id="logout" size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ProfileBadge;

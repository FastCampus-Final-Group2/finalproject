"use client";

import { UsersAPI } from "@/apis/users";
import { userState } from "@/atoms/user";
import Icon from "@/components/core/Icon";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

const ProfileBadge = () => {
  const isClient = useOnlyClient();

  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleClickLogoutBtn = async () => {
    const [error] = await UsersAPI.logout();

    if (!error) {
      setUser(undefined);
      router.push("/");
    }
  };

  if (!isClient) {
    // return <div className="h-9 w-[184px] animate-pulse rounded-lg bg-gray-800" />;
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

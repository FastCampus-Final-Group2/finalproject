"use client";

import { CenterAPI } from "@/apis/center";
import { DestinationAPI } from "@/apis/deliveryDestination";
import { userState } from "@/atoms/user";
import Button from "@/components/core/Button";
import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";
import { CenterResponse, DeliveryDestinationResponse } from "@/models/ApiTypes";
import { formatRestrictedTonObject } from "@/utils/tonCode";
import dayjs from "dayjs";
import { useSetRecoilState } from "recoil";

interface EditButtonsProps {
  id: number;
  updateAt?: string;
  onClose: () => void;
  isCenter: boolean;
  setInfo: React.Dispatch<React.SetStateAction<DeliveryDestinationResponse | CenterResponse | null>>;
}

const EditButtons = ({ id, updateAt, onClose, isCenter, setInfo }: EditButtonsProps) => {
  const setUser = useSetRecoilState(userState);
  const { isEdited, comment, hour, minute, wing, top, cargo } = useDeliveryModalEditContext();

  const handleClickEditBtn = async () => {
    const updateRequest = {
      restrictedWingBody: formatRestrictedTonObject(wing.restrictedTon),
      restrictedBox: formatRestrictedTonObject(top.restrictedTon),
      restrictedCargo: formatRestrictedTonObject(cargo.restrictedTon),
      comment,
      delayTime: hour * 60 + minute,
    };

    const [error] = isCenter
      ? await CenterAPI.updateDetailInfo(id, updateRequest)
      : await DestinationAPI.updateDetailInfo(id, updateRequest);

    if (error) {
      if (error.status === 401) {
        setUser(null);
      }
    } else {
      setInfo((prev) => {
        return {
          ...prev,
          ...updateRequest,
        };
      });
    }
  };

  return (
    <div className="flex w-full justify-between">
      {updateAt && (
        <span className="px-2.5 py-2 text-gray-900 text-B-14-B">{`수정일시 : ${dayjs(updateAt).format("YYYY.MM.DD HH:mm:ss")}`}</span>
      )}
      <div className="flex gap-3">
        <Button size="s" shape="text" intent="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button disabled={!isEdited} size="s" onClick={handleClickEditBtn}>
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default EditButtons;

"use client";

import Button from "@/components/core/Button";
import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";
import dayjs from "dayjs";

interface EditButtonsProps {
  updateAt: string;
  onClose: () => void;
}

const EditButtons = ({ updateAt, onClose }: EditButtonsProps) => {
  const { isEdited } = useDeliveryModalEditContext();

  return (
    <div className="flex w-full justify-between">
      <span className="px-2.5 py-2 text-gray-900 text-B-14-B">{`수정일시 : ${dayjs(updateAt).format("YYYY.MM.DD HH:mm:ss")}`}</span>
      <div className="flex gap-3">
        <Button size="s" shape="text" intent="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button disabled={!isEdited} size="s">
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default EditButtons;

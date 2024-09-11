import Icon from "@/components/core/Icon";
import { TON_CODE_BUTTON_INFOS } from "./index.constants";
import { CarModel } from "@/types/tonCode";
import RestrictedTonCodeButton from "./RestrictedTonCodeButton";
import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";
import { useMemo } from "react";

interface RestrictedTonCodeButtonsProps {
  carModel: CarModel;
}

const RestrictedTonCodeButtons = ({ carModel }: RestrictedTonCodeButtonsProps) => {
  const { restrictedTon, toggleRestrictedTon, setRestrictedTonAllTrue, setRestrictedTonAllFalse } =
    useDeliveryModalEditContext()[carModel];

  const allState = useMemo(() => {
    return Object.values(restrictedTon).every((value) => value === true);
  }, [restrictedTon]);

  const handleClickAllButton = () => {
    if (allState) setRestrictedTonAllFalse();
    else setRestrictedTonAllTrue();
  };

  return (
    <div className="flex gap-[17px]">
      <div className="flex flex-col items-center gap-[7px] px-4 py-3">
        <div className="flex h-5 w-10 items-center justify-center overflow-hidden">
          <Icon id={carModel} size={40} />
        </div>
        <span className="flex items-center justify-center text-gray-900 text-B-14-M">{carModel}</span>
      </div>
      <div className="flex gap-2">
        <RestrictedTonCodeButton tonCode="전체" position="all" isActive={allState} onClick={handleClickAllButton} />
        <div className="flex flex-col gap-2">
          {TON_CODE_BUTTON_INFOS.map((line, index) => {
            return (
              <div key={index} className="flex">
                {line.map(({ ton, position }) => {
                  return (
                    <RestrictedTonCodeButton
                      key={carModel + ton}
                      tonCode={ton + "T"}
                      position={position}
                      isActive={restrictedTon[ton]}
                      onClick={() => toggleRestrictedTon(ton)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestrictedTonCodeButtons;

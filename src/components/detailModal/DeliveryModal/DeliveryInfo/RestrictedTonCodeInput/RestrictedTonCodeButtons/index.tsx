import Icon from "@/components/core/Icon";
import { CAR_MODEL_MAP, TON_CODE_BUTTON_INFOS } from "./index.constants";
import { CarModel } from "@/types/tonCode";
import RestrictedTonCodeButton from "./RestrictedTonCodeButton";
import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";
import { useMemo } from "react";

interface RestrictedTonCodeButtonsProps {
  carModel: CarModel;
}

const RestrictedTonCodeButtons = ({ carModel }: RestrictedTonCodeButtonsProps) => {
  const { restrictedTonCode, toggleRestrictedTonCode, setRestrictedTonCodeAllTrue, setRestrictedTonCodeAllFalse } =
    useDeliveryModalEditContext();

  const allState = useMemo(() => {
    return Object.values(restrictedTonCode[carModel]).every((value) => value === true);
  }, [carModel, restrictedTonCode]);

  const handleClickAllButton = () => {
    if (allState) setRestrictedTonCodeAllFalse(carModel);
    else setRestrictedTonCodeAllTrue(carModel);
  };

  return (
    <div className="flex gap-[17px]">
      <div className="flex flex-col items-center gap-[7px] px-4 py-3">
        <div className="flex h-5 w-10 items-center justify-center overflow-hidden">
          <Icon id={CAR_MODEL_MAP[carModel]} size={40} />
        </div>
        <span className="flex items-center justify-center text-gray-900 text-B-14-M">{carModel}</span>
      </div>
      <div className="flex gap-2">
        <RestrictedTonCodeButton tonCode="전체" position="all" isActive={allState} onClick={handleClickAllButton} />
        <div className="flex flex-col gap-2">
          {TON_CODE_BUTTON_INFOS.map((line, index) => {
            return (
              <div key={index} className="flex">
                {line.map(({ label, position }) => {
                  return (
                    <RestrictedTonCodeButton
                      key={label}
                      tonCode={label}
                      position={position}
                      isActive={restrictedTonCode[carModel][label]}
                      onClick={() => toggleRestrictedTonCode(carModel, label)}
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

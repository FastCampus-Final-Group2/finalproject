import { CarModel, Ton, TonCodeObject } from "@/types/tonCode";
import { useState } from "react";

const useEditTonCode = (initialState: TonCodeObject) => {
  const [restrictedTonCode, setRestrictedTonCode] = useState(initialState);

  const toggleRestrictedTonCode = (carModel: CarModel, ton: Ton) => {
    setRestrictedTonCode((prev) => ({
      ...prev,
      [carModel]: {
        ...prev[carModel],
        [ton]: !prev[carModel][ton],
      },
    }));
  };

  const setRestrictedTonCodeAllTrue = (carModel: CarModel) => {
    setRestrictedTonCode((prev) => ({
      ...prev,
      [carModel]: Object.fromEntries(
        Object.entries(prev[carModel]).map(([key]) => {
          return [key, true];
        }),
      ),
    }));
  };

  const setRestrictedTonCodeAllFalse = (carModel: CarModel) => {
    setRestrictedTonCode((prev) => ({
      ...prev,
      [carModel]: Object.fromEntries(
        Object.entries(prev[carModel]).map(([key]) => {
          return [key, false];
        }),
      ),
    }));
  };

  return { restrictedTonCode, toggleRestrictedTonCode, setRestrictedTonCodeAllTrue, setRestrictedTonCodeAllFalse };
};

export default useEditTonCode;

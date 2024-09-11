import { RestrictedTonObject, Ton } from "@/types/tonCode";
import { useState } from "react";

const useEditTonCode = (
  initialState: RestrictedTonObject,
): [
  restrictedTonCode: RestrictedTonObject,
  toggleRestrictedTonCode: (ton: Ton) => void,
  setRestrictedTonCodeAllTrue: () => void,
  setRestrictedTonCodeAllFalse: () => void,
] => {
  const [restrictedTonCode, setRestrictedTonCode] = useState(initialState);

  const toggleRestrictedTonCode = (ton: Ton) => {
    setRestrictedTonCode((prev) => ({
      ...prev,
      [ton]: !prev[ton],
    }));
  };

  const setRestrictedTonCodeAllTrue = () => {
    setRestrictedTonCode({
      "1": true,
      "1.2": true,
      "1.4": true,
      "2.5": true,
      "3.5": true,
      "5": true,
      "8": true,
      "11": true,
    });
  };

  const setRestrictedTonCodeAllFalse = () => {
    setRestrictedTonCode({
      "1": false,
      "1.2": false,
      "1.4": false,
      "2.5": false,
      "3.5": false,
      "5": false,
      "8": false,
      "11": false,
    });
  };

  return [restrictedTonCode, toggleRestrictedTonCode, setRestrictedTonCodeAllTrue, setRestrictedTonCodeAllFalse];
};

export default useEditTonCode;

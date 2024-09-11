import { RestrictedTonObject, Ton } from "@/types/tonCode";

export const parseRestrictedTonString = (restrictedTonCode: string): RestrictedTonObject => {
  const tonCodes = restrictedTonCode.split(",");

  const restrictedTonObject = {
    "1": false,
    "1.2": false,
    "1.4": false,
    "2.5": false,
    "3.5": false,
    "5": false,
    "8": false,
    "11": false,
  };

  tonCodes.forEach((tonCode) => {
    restrictedTonObject[tonCode as Ton] = true;
  });

  return restrictedTonObject;
};

export const formatRestrictedTonObject = (restrictedTonObject: RestrictedTonObject): string => {
  return Object.keys(restrictedTonObject)
    .filter((key) => restrictedTonObject[key as Ton])
    .join(",");
};

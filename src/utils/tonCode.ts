import { CarModel, Ton } from "@/types/tonCode";

export const parseRestrictedTonCode = (restrictedTonCode: string) => {
  const tonCodes = restrictedTonCode.split(", ");

  const tonCodesObject = {
    윙바디: {
      "1T": false,
      "1.2T": false,
      "1.4T": false,
      "2.5T": false,
      "3.5T": false,
      "5T": false,
      "8T": false,
      "11T": false,
    },
    탑차: {
      "1T": false,
      "1.2T": false,
      "1.4T": false,
      "2.5T": false,
      "3.5T": false,
      "5T": false,
      "8T": false,
      "11T": false,
    },
    카고: {
      "1T": false,
      "1.2T": false,
      "1.4T": false,
      "2.5T": false,
      "3.5T": false,
      "5T": false,
      "8T": false,
      "11T": false,
    },
  };

  tonCodes.forEach((tonCode) => {
    const [carModel, ton] = tonCode.split(" ") as [CarModel, Ton];

    tonCodesObject[carModel][ton] = true;
  });

  return tonCodesObject;
};

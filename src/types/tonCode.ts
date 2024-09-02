export type CarModel = "윙바디" | "탑차" | "카고";

export type Ton = "1T" | "1.2T" | "1.4T" | "2.5T" | "3.5T" | "5T" | "8T" | "11T";

export type TonCode = `${CarModel} ${Ton}`;

export type TonCodeObject = {
  [Model in CarModel]: {
    [T in Ton]: boolean;
  };
};

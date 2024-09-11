export type Ton = "1" | "1.2" | "1.4" | "2.5" | "3.5" | "5" | "8" | "11";

export type CarModel = "wing" | "top" | "cargo";

export type RestrictedTonObject = {
  [T in Ton]: boolean;
};

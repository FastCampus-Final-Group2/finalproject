import { atom } from "recoil";

export const naverMapState = atom<naver.maps.Map | undefined>({
  key: "naverMapState",
  default: undefined,
  dangerouslyAllowMutability: true,
});

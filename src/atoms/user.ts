import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: typeof window !== "undefined" ? sessionStorage : undefined,
});

export const userState = atom<string | undefined>({
  key: "userState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

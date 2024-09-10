import { recoilPersist } from "recoil-persist";

export const { persistAtom } = recoilPersist({
  storage: typeof window !== "undefined" ? sessionStorage : undefined,
});

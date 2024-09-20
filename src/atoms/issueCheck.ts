import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface ClickedIssue {
  dispatchCodeId: number;
  dispatchId: number;
  dispatchDetailId: number;
}

export const issueCheckState = atom<ClickedIssue[]>({
  key: 'issueCheckState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const issueCheckSelector = selector({
  key: 'issueCheckSelector',
  get: ({ get }) => {
    return get(issueCheckState);
  },
});

export const issueReadState = atom({
  key: "issueReadState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

interface FocusedIssue {
  id: string;
  isFocused: boolean;
}

export const focusedIssueState = atom<FocusedIssue | null>({
  key: 'focusedIssueState',
  default: null,
});
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface ClickedIssue {
  dispatchCodeId: number;
  dispatchId: number;
  deliveryDestinationId: number;
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

// todo: 이슈 선택 시 읽음 처리
export const issueReadState = atom({
  key: "issueReadState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// todo: 특정 이슈 목록을 클릭하면 해당 이슈 목록에 해당하는 사이드탭으로 이동


// todo: 특정 이슈 목록을 클릭한 뒤 사이드탭이 열리면서 특정 운송 목록이 focus되면서 특정 색상이었다가 색상이 사라짐, 새로고침을 해도 사라진 색상이 유지되어야 함.


interface FocusedIssue {
  id: string;
  isFocused: boolean;
}

export const focusedIssueState = atom<FocusedIssue | null>({
  key: 'focusedIssueState',
  default: null,
});

// export const handleIssueFocus = (issueId: string) => {
//   const currentFocusedIssue = focusedIssueState.get();

//   if (currentFocusedIssue && currentFocusedIssue.id === issueId) {
//     focusedIssueState.set(null);
//   } else {
//     focusedIssueState.set({ id: issueId, isFocused: true });

//     // 색상 변경 후 일정 시간 뒤에 포커스 해제
//     setTimeout(() => {
//       focusedIssueState.set({ id: issueId, isFocused: false });
//     }, 3000); // 3초 후 포커스 해제 (필요에 따라 시간 조정 가능)
//   }
// };

// 로컬 스토리지에 포커스 상태 저장
// export const saveFocusStateToLocalStorage = () => {
//   const currentFocusedIssue = focusedIssueState.get();
//   if (currentFocusedIssue) {
//     localStorage.setItem('focusedIssue', JSON.stringify(currentFocusedIssue));
//   } else {
//     localStorage.removeItem('focusedIssue');
//   }
// };

// 페이지 로드 시 로컬 스토리지에서 포커스 상태 복원
// export const loadFocusStateFromLocalStorage = () => {
//   const savedFocusedIssue = localStorage.getItem('focusedIssue');
//   if (savedFocusedIssue) {
//     focusedIssueState.set(JSON.parse(savedFocusedIssue));
//   }
// };

// todo: 특정 이슈 목록을 클릭하면 '미확인 n건'의 숫자가 줄어들음, 해당 상태가 유지되어야 함.

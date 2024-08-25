export const DISPATCH_MODE_INFOS = [
  {
    title: "추천 배차엔진 사용",
    description: "주문에 딱 맞는 최적화 배차",
    tag: "자동",
    details: [
      "우선순위 & 가드레일 지표 설정으로 엔진 커스텀 가능",
      "비용, 최단시간, 고객만족도를 기준으로 엔진 비교 가능",
    ],
    isModalOpenable: false,
  },
  {
    title: "직접 배차하기",
    description: "주문등록부터 배차조정까지 간편하게",
    tag: "수동",
    details: ["엑셀 템플릿을 활용해서 주문등록", "경유순번 최적화,  제한&특이사항 안내 등 편의 기능 제공"],
    isModalOpenable: true,
  },
] as const;

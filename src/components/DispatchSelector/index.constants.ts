interface DispatchModeInfo {
  label: string;
  titles: string[];
  description: string;
  thumbnail: string;
  videos?: { src: string; type: string }[];
  disabled: boolean;
}

export const DISPATCH_MODE_INFOS: DispatchModeInfo[] = [
  {
    label: "자동배차",
    titles: ["주문에 딱 맞는 추천 배차엔진,", "자동배차 서비스 준비 중입니다."],
    description: "배차엔진 추천을 통해 최적화 배차를 도와주는 서비스를 준비 중입니다.",
    thumbnail: "/dispatch/dispatch_auto_thumbnail.png",
    disabled: true,
  },
  {
    label: "수동배차",
    titles: ["주문 등록부터 경로 최적화,", "배차조정까지 간편하게"],
    description: "오류주문 간편 수정, 제한&특이사항 안내 등의 편의 기능을 제공합니다.",
    thumbnail: "/dispatch/dispatch_manual_thumbnail.png",
    videos: [
      { src: "/dispatch/dispatch_manual_video.webm", type: "video/webm" },
      { src: "/dispatch/dispatch_manual_video.mp4", type: "video/mp4" },
    ],
    disabled: false,
  },
] as const;

import { IconId } from "@/components/core/Icon";

export interface SideNavBarLink {
  [key: string]: unknown;
  iconId: IconId;
  name: "기준정보" | "주문관리" | "운송관리" | "배차관리" | "차량관리" | "운임정산" | "레포트센터" | "공지사항";
  href?: string;
  subMenu?: { name: string }[];
}

export const SIDE_NAV_BAR_LINKS: SideNavBarLink[] = [
  {
    iconId: "tool",
    name: "기준정보",
    subMenu: [
      { name: "배송처관리" },
      { name: "센터별배송처" },
      { name: "센터관리" },
      { name: "운송사관리" },
      { name: "차량관리" },
      { name: "기사관리" },
      { name: "기사별 차량관리" },
      { name: "화주관리" },
      { name: "상품관리" },
    ],
  },
  {
    iconId: "order",
    name: "주문관리",
    subMenu: [
      { name: "주문등록" },
      { name: "주문업로드" },
      { name: "중복주문관리" },
      { name: "분배관리" },
      { name: "구간LEG관리" },
      { name: "주문현황" },
      { name: "중복주문처리현황" },
      { name: "POP주문관리" },
      { name: "운송실행주문관리" },
      { name: "재방문요청오더관리" },
    ],
  },
  {
    iconId: "place",
    name: "운송관리",
    subMenu: [
      { name: "운송거점" },
      { name: "운송경로그룹" },
      { name: "운송경로" },
      { name: "계획권한현황" },
      { name: "상품적재" },
      { name: "센터회차관리" },
      { name: "실구간거리" },
      { name: "운임" },
      { name: "권역" },
      { name: "서비스" },
      { name: "운임계정" },
      { name: "매입운임관리" },
    ],
  },
  {
    iconId: "truck",
    name: "배차관리",
    href: "/dispatch",
  },
  {
    iconId: "monitor",
    name: "차량관리",
    href: "/control",
  },
  {
    iconId: "wallet",
    name: "운임정산",
    subMenu: [
      { name: "바우처처리" },
      { name: "운임청구" },
      { name: "지입차월마감" },
      { name: "용차월마감" },
      { name: "택배월마감" },
    ],
  },
  {
    iconId: "chart",
    name: "레포트센터",
    subMenu: [{ name: "레포트관리" }, { name: "인터페이스 현황" }],
  },
  {
    iconId: "speaker",
    name: "공지사항",
  },
] as const;

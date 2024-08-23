export const SIDE_NAV_BAR_LINKS = [
  {
    iconId: "tool",
    name: "기준정보",
    href: "#info",
    isOpenable: true,
  },
  {
    iconId: "order",
    name: "주문관리",
    href: "#order",
    isOpenable: true,
  },
  {
    iconId: "place",
    name: "운송관리",
    href: "#place",
    isOpenable: true,
  },
  {
    iconId: "truck",
    name: "배차관리",
    href: "/dispatch",
    isOpenable: false,
  },
  {
    iconId: "monitor",
    name: "차량관리",
    href: "/control",
    isOpenable: false,
  },
  {
    iconId: "wallet",
    name: "운임정산",
    href: "#wallet",
    isOpenable: true,
  },
  {
    iconId: "chart",
    name: "레포트센터",
    href: "#chart",
    isOpenable: true,
  },
  {
    iconId: "speaker",
    name: "공지사항",
    href: "#speaker",
    isOpenable: false,
  },
] as const;

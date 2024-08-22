export const SIDE_NAV_BAR_LINKS = [
  {
    iconId: "tool",
    name: "기준정보",
    href: "#",
    isOpenable: true,
  },
  {
    iconId: "order",
    name: "주문관리",
    href: "#",
    isOpenable: true,
  },
  {
    iconId: "place",
    name: "운송관리",
    href: "#",
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
    href: "#",
    isOpenable: true,
  },
  {
    iconId: "chart",
    name: "레포트센터",
    href: "#",
    isOpenable: true,
  },
  {
    iconId: "speaker",
    name: "공지사항",
    href: "#",
    isOpenable: false,
  },
] as const;

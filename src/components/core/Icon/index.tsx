import { colors } from "@/styles/theme";

export type IconId =
  | "arrowLargeDoubleLeft"
  | "arrowLargeDoubleRight"
  | "arrowLargeLeft"
  | "arrowLargeRight"
  | "arrowUp"
  | "arrowDown"
  | "arrowLeft"
  | "arrowRight"
  | "star"
  | "starFill"
  | "checkBox"
  | "checkBoxFill"
  | "circle"
  | "circleFill"
  | "circleCancelFill"
  | "circleDashFill"
  | "circleCheck"
  | "circleCheckFill"
  | "circleAlert"
  | "circleAlertFill"
  | "download"
  | "triangleUp"
  | "triangleDown"
  | "warning"
  | "warningFill"
  | "toggleOn"
  | "toggleOff"
  | "search"
  | "pin"
  | "chart"
  | "check"
  | "profile"
  | "clock"
  | "bell"
  | "setting"
  | "order"
  | "home"
  | "tool"
  | "menuKebab"
  | "truck"
  | "speaker"
  | "wallet"
  | "monitor"
  | "pencil"
  | "x"
  | "restart"
  | "delete"
  | "copy"
  | "cargo"
  | "cargo_1.2T"
  | "cargo_1.4T"
  | "cargo_1T"
  | "cargo_2.5T"
  | "cargo_3.5T"
  | "cargo_5T"
  | "cargo_8T"
  | "cargo_11T"
  | "top"
  | "top_1.2T"
  | "top_1.4T"
  | "top_1T"
  | "top_2.5T"
  | "top_3.5T"
  | "top_5T"
  | "top_8T"
  | "top_11T"
  | "wing"
  | "wing_1.2T"
  | "wing_1.4T"
  | "wing_1T"
  | "wing_2.5T"
  | "wing_3.5T"
  | "wing_5T"
  | "wing_8T"
  | "wing_11T";

type IconSize = 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40;

// type ColorKey = keyof typeof colors;

// type ColorScale<K extends ColorKey> = keyof (typeof colors)[K] extends string | number
//   ? `${keyof (typeof colors)[K]}`
//   : never;

// type TextColor<K extends ColorKey> = K extends "white" | "black" ? `text-${K}` : `text-${K}-${ColorScale<K>}`;

// type ColorType = TextColor<ColorKey>;

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  id: IconId;
  size?: IconSize;
}

const Icon = ({ id, size = 24, className = "text-black", ...props }: IconProps) => {
  return (
    <svg width={size} height={size} fill="currentColor" className={className} {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default Icon;

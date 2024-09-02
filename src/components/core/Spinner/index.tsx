import Icon from "@/components/core/Icon";
import type { IconSize } from "@/components/core/Icon";

interface SpinnerProps {
  size?: IconSize;
}

const Spinner = ({ size = 40 }: SpinnerProps) => {
  return <Icon id="circleLoading" size={size} className="animate-spin" />;
};

export default Spinner;

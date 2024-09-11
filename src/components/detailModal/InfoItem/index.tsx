import { cn } from "@/utils/cn";
import { valueVariants } from "./index.variants";

interface InfoItemProps {
  label?: string;
  value?: string | number;
  line: 1 | 2 | 3;
}

const InfoItem = ({ label, value, line }: InfoItemProps) => {
  return (
    <div className="flex gap-4">
      {label && <div className="flex h-9 w-[125px] items-center py-2 pl-2.5 text-gray-900 text-T-16-B">{label}</div>}
      <div className={cn(valueVariants({ line }))}>{value}</div>
    </div>
  );
};

export default InfoItem;

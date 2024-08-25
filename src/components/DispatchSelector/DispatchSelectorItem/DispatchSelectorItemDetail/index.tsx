import Icon from "@/components/core/Icon";

interface DispatchSelectorItemDetailProps {
  detail: string;
}

const DispatchSelectorItemDetail = ({ detail }: DispatchSelectorItemDetailProps) => {
  return (
    <span className="flex items-center gap-1 text-gray-600 text-B-14-R group-hover:text-white">
      <Icon id="check" size={14} className="mr-1 text-gray-600 group-hover:text-white" />
      {detail}
    </span>
  );
};

export default DispatchSelectorItemDetail;

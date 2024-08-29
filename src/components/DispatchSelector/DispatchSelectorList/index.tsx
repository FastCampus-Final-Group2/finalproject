import DispatchSelectorItem from "@/components/DispatchSelector/DispatchSelectorItem";
import { DISPATCH_MODE_INFOS } from "@/components/DispatchSelector/index.constants";

const DispatchSelectorList = () => {
  return (
    <div className="flex gap-16">
      {DISPATCH_MODE_INFOS.map((info) => {
        return <DispatchSelectorItem key={info.label} dispatchModeInfo={info} />;
      })}
    </div>
  );
};

export default DispatchSelectorList;

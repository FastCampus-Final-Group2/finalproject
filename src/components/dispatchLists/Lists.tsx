import Icon from "@/components/core/Icon";
import mockdata from "./mockdata.json";
import { dispatchListClass } from "./index.varients";
import { cn } from "@/utils/cn";

interface ListItemProps {
  item: {
    progress: number;
    diapatchCode: string;
    dispatchName: string;
    startDateTime: string;
    totalOrder: number;
    smNum: number;
    manager: string;
  };
}

const ListItem = ({ item }: ListItemProps) => (
  <li className={cn(dispatchListClass({ borderBottom: "please", hover: "please" }))}>
    <p className={cn(dispatchListClass({ width: "small" }))}>
      <Icon id="checkBox" />
    </p>
    <p className={cn(dispatchListClass({ width: "medium" }))}>{item.progress}%</p>
    <p className={cn(dispatchListClass({ width: "extraLarge" }))}>
      <span className="w-1/2">{item.diapatchCode}</span>
      <span className="w-1/2">{item.dispatchName}</span>
    </p>
    <p className={cn(dispatchListClass({ width: "large" }))}>{item.startDateTime}</p>
    <p className={cn(dispatchListClass({ width: "medium" }))}>{item.totalOrder}</p>
    <p className={cn(dispatchListClass({ width: "medium" }))}>{item.smNum}</p>
    <p className={cn(dispatchListClass({ width: "medium" }))}>{item.manager}</p>
  </li>
);

const Lists = () => {
  return (
    <>
      <ul>
        {mockdata.results.map((item) => (
          <ListItem key={item.diapatchCode + item.startDateTime} item={item} />
        ))}
      </ul>
    </>
  );
};

export default Lists;

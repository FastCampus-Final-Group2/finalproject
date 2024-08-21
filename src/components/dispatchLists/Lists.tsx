import React from "react";
import Icon from "@/components/core/Icon";
import mockdata from "./mockdata.json";

interface ListItemProps {
  item: {
    percentage: number;
    diapatchCode: string;
    dispatchName: string;
    dispatchDate: string;
    everyOrder: string;
    numberOfDrivers: string;
    manager: string;
  };
}

const ListItem = ({ item }: ListItemProps) => (
  <li className="flex items-center gap-[16px] border-b border-gray-200">
    <p className="w-[60px]">
      <Icon id="checkBox" />
    </p>
    <p className="w-[180px] px-[12px] py-[8px]">{item.percentage}%</p>
    <p className="flex w-[348px] justify-between px-[12px] py-[8px]">
      <span className="w-1/2">{item.diapatchCode}</span>
      <span className="w-1/2">{item.dispatchName}</span>
    </p>
    <p className="w-[260px] px-[12px] py-[8px]">{item.dispatchDate}</p>
    <p className="w-[200px] px-[12px] py-[8px]">{item.everyOrder}</p>
    <p className="w-[200px] px-[12px] py-[8px]">{item.numberOfDrivers}</p>
    <p className="w-[200px] px-[12px] py-[8px]">{item.manager}</p>
  </li>
);

const Lists = () => {
  return (
    <div className="px-[24px] py-[16px] text-gray-900 text-B-14-M">
      <ul>
        {mockdata.map((item) => (
          <ListItem key={item.diapatchCode + item.dispatchDate} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Lists;

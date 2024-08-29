interface InfoItemProps {
  label: string;
  value: string | number;
  line: 1 | 2;
}

const InfoItem = ({ label, value, line }: InfoItemProps) => {
  return (
    <div className={`flex gap-4 ${line === 1 && "w-[648px]"}`}>
      <div className="flex w-[125px] items-center py-2 pl-2.5 text-gray-900 text-T-16-B">{label}</div>
      <div className="flex w-[175px] items-center rounded-4 border border-gray-200 p-2 text-gray-900">{value}</div>
    </div>
  );
};

export default InfoItem;

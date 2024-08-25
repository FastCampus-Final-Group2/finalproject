import dayjs from "dayjs";

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  prevMonth: () => void;
  nextMonthFunc: () => void;
}

const Header = ({ currentMonth, prevMonth, nextMonthFunc }: HeaderProps) => {
  return (
    <div className="text-lg relative mb-[5px] flex items-center border-b border-gray-100 py-[5px]">
      <button onClick={prevMonth} className="absolute left-[10px] text-gray-500">
        &lt;
      </button>
      <p className="font-bold mx-auto">{currentMonth.format("YYYY년 M월")}</p>
      <button onClick={nextMonthFunc} className="absolute right-[10px] text-gray-500">
        &gt;
      </button>
    </div>
  );
};

export default Header;

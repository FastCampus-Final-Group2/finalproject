const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const DaysRow = () => {
  return (
    <div className="font-bold mb-[6px] flex w-full justify-between text-B-14-B">
      {dayNames.map((day, index) => (
        <div className={`flex-1 px-2 text-center ${index === 0 ? "text-red-500" : ""}`} key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysRow;

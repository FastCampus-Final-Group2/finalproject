const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const DaysRow = () => {
  return (
    <div className="text-lg font-bold flex w-full justify-between">
      {dayNames.map((day, index) => (
        <div className={`flex-1 px-2 text-center ${index === 0 ? "text-red-500" : ""}`} key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysRow;

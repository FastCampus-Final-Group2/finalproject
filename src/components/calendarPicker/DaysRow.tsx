const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const DaysRow = () => {
  return (
    <div className="text-lg font-bold flex w-full justify-between text-red-500">
      {dayNames.map((day, index) => (
        <div className="flex-1 px-2 text-center" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysRow;

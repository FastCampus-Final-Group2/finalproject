const OrderValidationHeader = () => {
  return (
    <header className="flex w-full items-center gap-5">
      <h2 className="text-H-28-B">업로드 주문 목록</h2>
      <input className="w-[174px]" placeholder="배차명 입력하기" />
      <div>날짜 입력</div>
    </header>
  );
};

export default OrderValidationHeader;

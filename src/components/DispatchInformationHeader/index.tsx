// "use client";

// import { useState } from "react";
// import CopyButton from "@/components/core/CopyButton";
// import Button from "@/components/core/Button";
// import ConfirmModal from "@/components/ConfirmModal";
// import dayjs from "dayjs";

// interface DispatchInformationHeaderProps {
//   dispatchCode: string;
//   dispatchName: string;
//   loadingStartTime: string;
//   contractType: string;
// }

// const DispatchInformationHeader = ({
//   dispatchCode,
//   dispatchName,
//   loadingStartTime,
//   contractType,
// }: DispatchInformationHeaderProps) => {
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

//   const formatDate = (dateString: string) => {
//     return dayjs(dateString).format("MM월 DD일 HH:mm");
//   };

//   const handleCancelDispatch = () => {
//     setIsCancelModalOpen(true);
//   };

//   const handleConfirmDispatch = () => {
//     setIsConfirmModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsCancelModalOpen(false);
//     setIsConfirmModalOpen(false);
//   };

//   const handleCancelDispatchConfirm = () => {
//     // 배차 취소 확인 시 동작
//     console.log("배차 취소가 확인되었습니다.");
//     setIsCancelModalOpen(false);
//   };

//   const handleConfirmDispatchConfirm = () => {
//     // 배차 확정 확인 시 동작
//     console.log("배차가 확정되었습니다.");
//     setIsConfirmModalOpen(false);
//   };

//   return (
//     <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
//       <div className="flex h-[36px] w-[535px] items-center gap-5">
//         <div className="flex h-[36px] w-[172px] items-center justify-center gap-[6px] text-[20px] font-B leading-[24px]">
//           <span>{dispatchCode}</span>
//           <CopyButton copyString={dispatchCode} />
//         </div>
//         <div className="flex h-[36px] w-[351px] gap-6">
//           <div className="flex h-[36px] w-[174px] items-center justify-center leading-[24px] text-T-18-M">
//             {dispatchName}
//           </div>
//           <div className="flex h-[36px] w-[116px] items-center justify-center rounded-[4px] bg-gray-100 leading-[24px] text-B-14-M">
//             {formatDate(loadingStartTime)}
//           </div>
//           <div className="flex h-[36px] w-[41px] items-center justify-center rounded-[4px] bg-gray-700 leading-[24px] text-white text-B-14-B">
//             {contractType}
//           </div>
//         </div>
//       </div>
//       <div className="flex h-[40px] gap-4">
//         <Button size="s" intent="secondary" onClick={handleCancelDispatch}>
//           배차 취소
//         </Button>
//         <Button size="s" onClick={handleConfirmDispatch}>
//           배차 확정
//         </Button>
//       </div>

//       {isCancelModalOpen && (
//         <ConfirmModal
//           title="배차를 취소 하시겠습니까?"
//           text={[{ type: "alert", value: "배차취소 시, 상태는 복구되지 않습니다." }]}
//           onClickClose={handleCloseModal}
//           onConfirm={handleCancelDispatchConfirm}
//           leftButtonText="돌아가기"
//           rightButtonText="배차취소"
//         />
//       )}

//       {isConfirmModalOpen && (
//         <ConfirmModal
//           title="배차확정"
//           text={[
//             { type: "sub", value: "배차를 확정하시겠습니까?" },
//             { type: "main", value: "확정시, 기사님에게 운송이 요청됩니다." },
//           ]}
//           onClickClose={handleCloseModal}
//           // onConfirm={handleConfirmDispatchConfirm}
//           leftButtonText="취소"
//           rightButtonText="확인"
//         />
//       )}
//     </div>
//   );
// };

// export default DispatchInformationHeader;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위해 useRouter 훅 추가
import CopyButton from "@/components/core/CopyButton";
import Button from "@/components/core/Button";
import ConfirmModal from "@/components/ConfirmModal";
import dayjs from "dayjs";
import axios from "@/utils/axios"; // axios.ts에서 export한 axios 인스턴스 사용
import { transportOrderState } from "@/atoms/transportOrder";
import { useRecoilValue } from "recoil";

const DispatchInformationHeader = () => {
  const dispatchData = useRecoilValue(transportOrderState);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter(); // useRouter 훅을 사용해 페이지 이동 관리

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MM월 DD일 HH:mm");
  };

  const handleCancelDispatch = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmDispatch = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleCancelDispatchConfirm = () => {
    // 배차 취소 확인 시 동작
    console.log("배차 취소가 확인되었습니다.");
    setIsCancelModalOpen(false);
  };

  const handleConfirmDispatchConfirm = async () => {
    // 배차 확정 확인 시 서버로 데이터 전송
    const requestBodyDispatchData = {
      dispatchCode: dispatchData.dispatchCode,
      dispatchName: dispatchData.dispatchName,
      loadingStartTime: dispatchData.loadingStartTime,
      dispatchList: [
        {
          smId: 1,
          breakStartTime: "00:30",
          breakEndTime: "00:30",
          restingStopover: 4,
          dispatchDetailList: [
            {
              smName: "홍길동",
              ett: 30,
              expectationOperationStartTime: "2024-09-13T05:51:31.450Z",
              expectationOperationEndTime: "2024-09-13T05:51:31.450Z",
              deliveryDestinationId: 1,
              phoneNumber: "010-1234-5678",
              orderNumber: "ORD123456",
              orderDate: "2024-08-08",
              lat: 37.5995,
              lon: 127.1116,
              distance: 3.3,
              deliveryType: "택배",
              shipmentNumber: "C0029384889",
              orderType: "배송",
              serviceRequestDate: "2023-08-28",
              serviceRequestTime: "00:30",
              clientName: "홍길동",
              lotNumberAddress: "서울특별시 강남구 강남동 37",
              roadAddress: "서울특별시 강남구 강남대로 123",
              detailAddress: "강남빌딩 3층",
              zipcode: "06000",
              volume: 1.5,
              weight: 10,
              note: "조심히 다뤄주세요.",
              expectedServiceDuration: 20,
              productName: "상품명 A",
              productCode: "ST05",
              productQuantity: 3,
            },
          ],
          coordinates: [
            { lon: 127.1116, lat: 37.5995 },
            { lon: 127.112, lat: 37.6 },
            { lon: 127.1135, lat: 37.6012 },
          ],
        },
      ],
    };

    try {
      const response = await axios.post("/dispatch", requestBodyDispatchData); // 서버로 데이터 전송
      console.log("응답 상태 코드:", response.status); // 응답 상태 코드 출력
      if (response.status === 200 || response.status === 201) {
        console.log("배차 확정이 성공적으로 처리되었습니다.");
        router.push("/control"); // 성공 시 /control 페이지로 이동
      }
    } catch (error) {
      console.error("배차 확정 중 오류가 발생했습니다.", error);
    } finally {
      setIsConfirmModalOpen(false); // 모달 닫기
    }
  };

  return (
    <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <div className="flex h-[36px] w-[535px] items-center gap-5">
        <div className="flex h-[36px] w-[172px] items-center justify-center gap-[6px] text-[20px] font-B leading-[24px]">
          <span>{dispatchData.dispatchCode}</span>
          <CopyButton copyString={dispatchData.dispatchCode} />
        </div>
        <div className="flex h-[36px] w-[351px] gap-6">
          <div className="flex h-[36px] w-[174px] items-center justify-center leading-[24px] text-T-18-M">
            {dispatchData.dispatchName}
          </div>
          <div className="flex h-[36px] w-[116px] items-center justify-center rounded-[4px] bg-gray-100 leading-[24px] text-B-14-M">
            {formatDate(dispatchData.loadingStartTime)}
          </div>
          <div className="flex h-[36px] w-[41px] items-center justify-center rounded-[4px] bg-gray-700 leading-[24px] text-white text-B-14-B">
            {dispatchData.contractType}
          </div>
        </div>
      </div>
      <div className="flex h-[40px] gap-4">
        <Button size="s" intent="secondary" onClick={handleCancelDispatch}>
          배차 취소
        </Button>
        <Button size="s" onClick={handleConfirmDispatch}>
          배차 확정
        </Button>
      </div>

      {isCancelModalOpen && (
        <ConfirmModal
          title="배차를 취소 하시겠습니까?"
          text={[{ type: "alert", value: "배차취소 시, 상태는 복구되지 않습니다." }]}
          onClickClose={handleCloseModal}
          onConfirm={handleCancelDispatchConfirm}
          leftButtonText="돌아가기"
          rightButtonText="배차취소"
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          title="배차확정"
          text={[
            { type: "sub", value: "배차를 확정하시겠습니까?" },
            { type: "main", value: "확정시, 기사님에게 운송이 요청됩니다." },
          ]}
          onClickClose={handleCloseModal}
          onConfirm={handleConfirmDispatchConfirm}
          leftButtonText="취소"
          rightButtonText="확인"
        />
      )}
    </div>
  );
};

export default DispatchInformationHeader;

import ControlDiapatchHeader from "@/components/ControlDiapatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMap from "@/components/core/NaverMap";

// todo: 여기가 vihicle-control 중심
// /api/dispatchCode/{dispatchCodeId}/vehicle-control
// /api/dispatch-detail/{dispatchId}/vehicle-control

const ControlDetailPage = () => {
  return (
    <>
      <ControlDiapatchHeader />
      <div className="flex w-full">
        <ControlDispatchDashboard />
        <div className="w-full">
          {/* todo: 확인 필요. w-11/12이 옆의 빈 공간을 만듦 */}
          <NaverMap latitude={37.5665} longitude={126.978} />
        </div>
      </div>
    </>
  );
};

export default ControlDetailPage;

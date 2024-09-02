import ControlDiapatchHeader from "@/components/ControlDiapatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMap from "@/components/core/NaverMap";

const ControlDetailPage = () => {
  return (
    <>
      <ControlDiapatchHeader />
      <div className="flex w-full">
        <ControlDispatchDashboard />
        <div className="w-full">
          <NaverMap latitude={37.5665} longitude={126.978} />
        </div>
      </div>
    </>
  );
};

export default ControlDetailPage;

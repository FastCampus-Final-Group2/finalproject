import Dimmed from "@/components/core/Dimmed";

interface OrderDetailModalProps {
  title: string;
  children: React.ReactNode;
}

const ModalBase = ({ title, children }: OrderDetailModalProps) => {
  return (
    <Dimmed>
      <div className="flex w-[740px] flex-col items-center gap-5 rounded-lg bg-blue-30 p-7">
        <div className="self-start text-H-28-B">{title}</div>
        {children}
      </div>
    </Dimmed>
  );
};

export default ModalBase;

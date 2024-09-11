import Dimmed from "@/components/core/Dimmed";
import ProgressBar, { ProgressBarProps } from "@/components/core/ProgressBar";
import Spinner from "@/components/core/Spinner";

interface LoadingModalProps extends ProgressBarProps {
  title: string;
  text?: string[];
}

const LoadingModal = ({ title, text, onLoadingEnd, ...progressBarProps }: LoadingModalProps) => {
  return (
    <Dimmed>
      <div className="flex h-[289px] w-[392px] flex-col rounded-xl bg-white px-7 pb-[68px] pt-[63px]">
        <div className="flex flex-grow flex-col items-center gap-4">
          <Spinner />
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="mb-3 text-gray-900 text-T-18-B">{title}</p>
              {text?.map((value, index) => {
                return (
                  <p key={index} className="text-red-500 text-B-14-M">
                    {value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <ProgressBar {...progressBarProps} />
      </div>
    </Dimmed>
  );
};

export default LoadingModal;

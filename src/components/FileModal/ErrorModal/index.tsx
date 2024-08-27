import Dimmed from "@/components/core/Dimmed";
import Icon from "@/components/core/Icon";

interface ErrorModalProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal = ({ setIsError }: ErrorModalProps) => {
  return (
    <Dimmed>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
        <p className="flex flex-col items-center gap-[13px]">
          <button type="button" onClick={() => setIsError(false)} className="self-end text-gray-900 text-B-14-M">
            다시시도
          </button>
          <Icon id="circleAlert" size={40} className="text-gray-800" />
        </p>
        <div className="flex flex-col items-center gap-7">
          <p className="text-center text-gray-900 text-B-14-B">
            잘못된 파일 형식이거나 오류가 있습니다.
            <br />
            아래 주의사항을 읽어보시고 다시 시도해주세요.
          </p>
          <ul className="list-inside list-disc rounded-4 bg-gray-50 p-6 text-red-500 text-B-14-M">
            <li>파일과 확장자가 맞는지 확인해주세요.</li>
            <li>파일 내 칼럼이 정확하게 설정되어 있는지 확인해주세요.</li>
            <li>빈파일은 업로드가 불가합니다. 파일 내 데이터를 확인해주세요.</li>
          </ul>
        </div>
      </div>
    </Dimmed>
  );
};

export default ErrorModal;

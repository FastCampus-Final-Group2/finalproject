import Icon from "@/components/core/Icon";

interface ListCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const ListCheckbox = ({ isChecked, onChange }: ListCheckboxProps) => {
  return (
    <div onClick={onChange} className="cursor-pointer" role="input">
      {/* input 태그는 화면에서 숨기기 */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden" // input 숨기기
      />
      {/* Icon으로 체크박스 표시 */}
      <Icon id={isChecked ? "checkBoxFill" : "checkBox"} size={20} className="text-gray-500" />
    </div>
  );
};

export default ListCheckbox;

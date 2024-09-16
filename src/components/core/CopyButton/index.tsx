"use client";

import Icon from "@/components/core/Icon";

interface CopyButtonProps {
  copyString?: string;
}

const CopyButton = ({ copyString = "" }: CopyButtonProps) => {
  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(copyString)
      .then(() => alert("배차번호가 클립보드에 복사되었습니다!"))
      .catch(() => alert("배차번호 복사에 실패했습니다."));
  };
  return (
    <button>
      <Icon id="copy" size={16} onClick={handleCopyAddress} />
    </button>
  );
};

export default CopyButton;

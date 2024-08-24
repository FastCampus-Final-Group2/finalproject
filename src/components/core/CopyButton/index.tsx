'use client';

import Icon from "@/components/core/Icon";

const CopyButton = () => {
  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText('240808C001')
      .then(() => alert('주소가 클립보드에 복사되었습니다!'))
      .catch(() => alert('주소 복사에 실패했습니다.'));
  };  
  return (
    <button>
      <Icon id="copy" size="16" onClick={handleCopyAddress} />
    </button>
  );
};

export default CopyButton;
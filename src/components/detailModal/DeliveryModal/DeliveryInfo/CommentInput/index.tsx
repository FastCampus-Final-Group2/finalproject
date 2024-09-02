"use client";

import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import { inputVariants } from "./index.variants";
import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";

const CommentInput = () => {
  const { comment, setComment } = useDeliveryModalEditContext();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className="relative flex w-full gap-4">
      <div className="flex h-9 w-[125px] items-center py-2 pl-2.5 text-gray-900 text-T-16-B">비고</div>
      <input
        className={cn(inputVariants({ hasValue: comment !== "" }))}
        value={comment}
        placeholder="텍스트를 입력해주세요."
        onChange={handleCommentChange}
      />
      {comment !== "" && (
        <button type="button" className="absolute bottom-0 right-0 h-9 w-[43px] pl-2.5" onClick={() => setComment("")}>
          <Icon id="circleCancelFill" size={16} className="text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default CommentInput;

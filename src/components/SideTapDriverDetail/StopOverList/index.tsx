"use client";

import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import Icon from "@/components/core/Icon";
import StopOver from "@/components/SideTapDriverDetail/StopOverList/StopOver";
import StopOverStartCenter from "@/components/SideTapDriverDetail/StopOverList/StopOverStartCenter";
import { BG_50 } from "@/styles/smColor";
import { StrictModeDroppable } from "@/components/DragDrop/StrictModeDroppable";
import { ListStopOverData } from "@/components/SideTapDriverDetail";

export interface ColorProps {
  bgColor: keyof typeof BG_50;
}

interface StopOverListProps {
  listStopOverData: ListStopOverData[];
  isExpanded: boolean;
  toggleExpand: () => void;
  bgColor: keyof typeof BG_50;
}

const StopOverList = ({ bgColor, listStopOverData, isExpanded, toggleExpand }: StopOverListProps) => {
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const count = listStopOverData.filter(
      (stopOver) => stopOver.restrictedTonCode || stopOver.delayRequestTime || stopOver.overContractNum,
    ).length;
    setErrorCount(count);
  }, [isExpanded, listStopOverData]);

  return (
    <div className={`inline-flex h-[656px] items-start justify-start gap-[12px] ${BG_50[bgColor]} px-[32px] pb-[24px]`}>
      <div className="flex items-start justify-start gap-[12px] self-stretch">
        <div className="inline-flex flex-col items-end justify-start gap-[12px]">
          <div className="inline-flex h-[28px] w-[376px] items-center justify-start gap-[6px]">
            <div className="flex items-center justify-start gap-[4px]">
              <div className="flex items-center justify-start gap-[2px]">
                <div className="text-center text-gray-900 text-T-16-B">오류 주문</div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-red-500 text-T-16-B">{errorCount}</div>
                  <div className="text-center text-gray-900 text-T-16-B">건</div>
                </div>
              </div>
              <div className="text-center text-gray-900 text-T-16-M">모아보기</div>
              <button onClick={errorCount > 0 ? toggleExpand : undefined} disabled={errorCount === 0}>
                {!isExpanded ? (
                  <Icon id="toggleOn" size={28} className="text-gray-500" />
                ) : (
                  <Icon id="toggleOff" size={28} className="text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-start">
                <div className="relative h-[28px] w-[28px]" />
              </div>
            </div>
          </div>

          <StrictModeDroppable droppableId="droppableStopOverData">
            {(provided) => (
              <div
                className="flex h-[580px] w-[376px] flex-col items-start justify-start overflow-y-auto scrollbar-hide"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {!isExpanded ? (
                  <>
                    {listStopOverData[0] && (
                      <StopOverStartCenter
                        bgColor={bgColor}
                        ett={listStopOverData[0].ett}
                        distance={listStopOverData[0].distance}
                      />
                    )}

                    {listStopOverData.map((stopOver, index) => (
                      <Draggable key={stopOver.shipmentNumber} draggableId={`${stopOver.shipmentNumber}`} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <StopOver
                              errorRestrictedTonCode={stopOver.restrictedTonCode}
                              errorDelayRequestTime={stopOver.delayRequestTime}
                              errorOverContractNum={stopOver.overContractNum}
                              index={index}
                              totalLength={listStopOverData.length}
                              bgColor={bgColor}
                              roadAddress={stopOver.roadAddress}
                              detailAddress={stopOver.detailAddress}
                              orderType={stopOver.orderType}
                              expectationOperationStartTime={stopOver.expectationOperationStartTime}
                              expectationOperationEndTime={stopOver.expectationOperationEndTime}
                              ett={stopOver.ett}
                              distance={stopOver.distance}
                              isExpanded={isExpanded}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </>
                ) : (
                  <>
                    {listStopOverData
                      .filter(
                        (stopOver) =>
                          stopOver.restrictedTonCode || stopOver.delayRequestTime || stopOver.overContractNum,
                      )
                      .map((stopOver, index) => (
                        <Draggable
                          key={`stopOver-${stopOver.shipmentNumber}`}
                          draggableId={`stopOver-${stopOver.shipmentNumber}`}
                          index={index}
                        >
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <StopOver
                                errorRestrictedTonCode={stopOver.restrictedTonCode}
                                errorDelayRequestTime={stopOver.delayRequestTime}
                                errorOverContractNum={stopOver.overContractNum}
                                index={index}
                                totalLength={listStopOverData.length}
                                bgColor={bgColor}
                                roadAddress={stopOver.roadAddress}
                                detailAddress={stopOver.detailAddress}
                                orderType={stopOver.orderType}
                                expectationOperationStartTime={stopOver.expectationOperationStartTime}
                                expectationOperationEndTime={stopOver.expectationOperationEndTime}
                                ett={stopOver.ett}
                                distance={stopOver.distance}
                                isExpanded={isExpanded}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </div>
        {/* <pre>{JSON.stringify(listStopOverData, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default StopOverList;

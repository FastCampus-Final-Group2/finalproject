import Icon from "@/components/core/Icon";

const FloorAreaRatioCard = () => {
  // todo: smName, phoneNumber는 나중에 지울 것
  return (
    <div className="flex h-fit w-fit flex-col items-center gap-[20px] rounded-[4px] bg-lime-100 px-[25px] pb-[14px] pt-[12px] text-B-14-M">
      <ul className="flex gap-[4px]">
        <li className="text-B-14-B">김도희</li> {/* smName */}
        <li>010-1234-5678</li> {/* phoneNumber */}
      </ul>
      <div className="flex items-center gap-[8px]">
        <div className="flex flex-col items-center">
          <p>용적률</p>
          <Icon id="wing_3.5T" size={40} />
        </div>
        <div>
          <div className="relative h-[60px] w-[60px] rounded-full bg-lime-650">
            <div className="absolute left-1/2 top-1/2 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-lime-100">
              <p className="text-T-18-B">90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// .loader {
//   width: 50px;
//   aspect-ratio: 1;
//   border-radius: 50%;
//   background:
//     radial-gradient(farthest-side,#ffa516 94%,#0000) top/8px 8px no-repeat,
//     conic-gradient(#0000 30%,#ffa516);
//   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
//   animation: l13 1s infinite linear;
// }
// @keyframes l13{
//   100%{transform: rotate(1turn)}
// }

export default FloorAreaRatioCard;

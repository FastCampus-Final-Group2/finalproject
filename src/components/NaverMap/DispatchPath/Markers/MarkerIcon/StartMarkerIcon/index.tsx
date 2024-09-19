interface StartMarkerProps {
  color: string;
  isSelected: boolean;
}

const StartMarkerIcon = ({ color, isSelected }: StartMarkerProps) => {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className={"group"}>
      <rect
        x="2.11719"
        y="2.96875"
        width="32"
        height="32"
        rx="16"
        className={isSelected ? "fill-white group-hover:fill-transparent" : "fill-white group-hover:fill-gray-900"}
      />
      <rect
        x="2.11719"
        y="2.96875"
        width="32"
        height="32"
        rx="16"
        fill={color}
        className={isSelected ? "hidden group-hover:block" : "hidden"}
      />
      <rect
        x="2.11719"
        y="2.96875"
        width="32"
        height="32"
        rx="16"
        stroke={isSelected ? color : "#191919"}
        strokeWidth="4"
      />
      <g clipPath="url(#clip0_994_29341)" className="group-hover:hidden">
        <path
          d="M20.1172 13.4688L19.3972 12.0188C19.2272 11.6788 18.8772 11.4688 18.4972 11.4688H12.1172C11.5672 11.4688 11.1172 11.9187 11.1172 12.4688V27.4688C11.1172 28.0187 11.5672 28.4688 12.1172 28.4688C12.6672 28.4688 13.1172 28.0187 13.1172 27.4688V21.4688H18.1172L18.8372 22.9187C19.0072 23.2587 19.3572 23.4688 19.7272 23.4688H25.1172C25.6672 23.4688 26.1172 23.0188 26.1172 22.4688V14.4688C26.1172 13.9188 25.6672 13.4688 25.1172 13.4688H20.1172ZM24.1172 21.4688H20.1172L19.1172 19.4688H13.1172V13.4688H18.1172L19.1172 15.4688H24.1172V21.4688Z"
          fill={isSelected ? color : "#191919"}
        />
      </g>
      <g clipPath="url(#clip0_994_29340)" className="hidden group-hover:block">
        <path
          d="M20.5172 12.9688L20.2772 11.7688C20.1872 11.3088 19.7772 10.9688 19.2972 10.9688H12.1172C11.5672 10.9688 11.1172 11.4187 11.1172 11.9688V26.9688C11.1172 27.5187 11.5672 27.9688 12.1172 27.9688C12.6672 27.9688 13.1172 27.5187 13.1172 26.9688V20.9688H18.7172L18.9572 22.1687C19.0472 22.6388 19.4572 22.9688 19.9372 22.9688H25.1172C25.6672 22.9688 26.1172 22.5188 26.1172 21.9688V13.9688C26.1172 13.4188 25.6672 12.9688 25.1172 12.9688H20.5172Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_994_29341">
          <rect width="24" height="24" fill="white" transform="translate(6.11719 7.46875)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StartMarkerIcon;

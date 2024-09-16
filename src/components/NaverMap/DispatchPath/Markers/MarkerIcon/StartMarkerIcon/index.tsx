interface StartMarkerProps {
  color: string;
}

const StartMarkerIcon = ({ color }: StartMarkerProps) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={"text-white group-hover:text-gray-900"}
    >
      <rect x="2.11719" y="2.96875" width="32" height="32" rx="16" fill="white" />
      <rect x="2.11719" y="2.96875" width="32" height="32" rx="16" stroke={color} strokeWidth="4" />
      <g clipPath="url(#clip0_994_29341)">
        <path
          d="M20.1172 13.4688L19.3972 12.0188C19.2272 11.6788 18.8772 11.4688 18.4972 11.4688H12.1172C11.5672 11.4688 11.1172 11.9187 11.1172 12.4688V27.4688C11.1172 28.0187 11.5672 28.4688 12.1172 28.4688C12.6672 28.4688 13.1172 28.0187 13.1172 27.4688V21.4688H18.1172L18.8372 22.9187C19.0072 23.2587 19.3572 23.4688 19.7272 23.4688H25.1172C25.6672 23.4688 26.1172 23.0188 26.1172 22.4688V14.4688C26.1172 13.9188 25.6672 13.4688 25.1172 13.4688H20.1172ZM24.1172 21.4688H20.1172L19.1172 19.4688H13.1172V13.4688H18.1172L19.1172 15.4688H24.1172V21.4688Z"
          fill={color}
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

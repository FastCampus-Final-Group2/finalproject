interface EndMarkerProps {
  color: string;
}

const EndMarkerIcon = ({ color }: EndMarkerProps) => {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.11719" y="2.96875" width="32" height="32" rx="16" fill={color} />
      <rect x="2.11719" y="2.96875" width="32" height="32" rx="16" stroke={color} strokeWidth="4" />
      <g clipPath="url(#clip0_994_29340)">
        <path
          d="M20.5172 12.9688L20.2772 11.7688C20.1872 11.3088 19.7772 10.9688 19.2972 10.9688H12.1172C11.5672 10.9688 11.1172 11.4187 11.1172 11.9688V26.9688C11.1172 27.5187 11.5672 27.9688 12.1172 27.9688C12.6672 27.9688 13.1172 27.5187 13.1172 26.9688V20.9688H18.7172L18.9572 22.1687C19.0472 22.6388 19.4572 22.9688 19.9372 22.9688H25.1172C25.6672 22.9688 26.1172 22.5188 26.1172 21.9688V13.9688C26.1172 13.4188 25.6672 12.9688 25.1172 12.9688H20.5172Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_994_29340">
          <rect width="24" height="24" fill="white" transform="translate(6.11719 6.96875)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EndMarkerIcon;

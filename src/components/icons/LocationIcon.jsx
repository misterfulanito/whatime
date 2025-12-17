const LocationIcon = ({ size = 32, color = "currentColor", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M16 16.6667C18.2091 16.6667 20 14.8758 20 12.6667C20 10.4575 18.2091 8.66666 16 8.66666C13.7908 8.66666 12 10.4575 12 12.6667C12 14.8758 13.7908 16.6667 16 16.6667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 29.3333C18.6666 24 26.6666 20.5577 26.6666 13.3333C26.6666 7.44229 21.891 2.66666 16 2.66666C10.1089 2.66666 5.33331 7.44229 5.33331 13.3333C5.33331 20.5577 13.3333 24 16 29.3333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LocationIcon;

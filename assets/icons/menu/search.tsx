import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => {  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <g
        stroke={props.stroke || "#444"}
        strokeWidth={props.strokeWidth || 1}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#a)"
      >
        <path d="M8.615 16.23a7.615 7.615 0 1 0 0-15.23 7.615 7.615 0 0 0 0 15.23ZM19 19l-4.846-4.846" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgComponent;

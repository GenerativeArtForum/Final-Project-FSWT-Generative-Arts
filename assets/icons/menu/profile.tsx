import * as React from "react"
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke={props.stroke || "#444"}
        strokeWidth={props.strokeWidth || 1}
        d="M10.5 9.125a3.442 3.442 0 0 1-3.438-3.438A3.442 3.442 0 0 1 10.5 2.25a3.442 3.442 0 0 1 3.438 3.438A3.442 3.442 0 0 1 10.5 9.124Zm7.375 8.375v.375H3.125V17.5c0-3.1 2.524-5.625 5.625-5.625h3.5c3.1 0 5.625 2.524 5.625 5.625Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent

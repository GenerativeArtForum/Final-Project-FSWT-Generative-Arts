import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 .5H3.5A1.5 1.5 0 0 0 2 2v13.5L.5 20l6-1.5h12A1.5 1.5 0 0 0 20 17V9.5"
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1}
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.295 11.955-4.5.81.75-4.56L15.64 1.14a1.497 1.497 0 0 1 2.13 0l1.59 1.59a1.502 1.502 0 0 1 0 2.13l-7.065 7.095Z"
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1}
    />
  </svg>
);
export default SvgComponent;

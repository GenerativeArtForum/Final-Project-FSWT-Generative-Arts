import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={9}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || "#000"}
      d="M14.187.298 8 6.44 1.813.298a1.074 1.074 0 0 0-1.5.013A1.058 1.058 0 0 0 .3 1.801L7.24 8.69A1.062 1.062 0 0 0 8 9a1.073 1.073 0 0 0 .76-.31L15.7 1.8a1.058 1.058 0 0 0-.013-1.489 1.074 1.074 0 0 0-1.5-.013Z"
    />
  </svg>
);
export default SvgComponent;

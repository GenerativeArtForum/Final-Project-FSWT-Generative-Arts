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
      fill={props.color || '#000'}
      d="M1.813 8.702 8 2.56l6.187 6.142a1.074 1.074 0 0 0 1.5-.013 1.059 1.059 0 0 0 .013-1.49L8.76.31A1.062 1.062 0 0 0 8 0a1.074 1.074 0 0 0-.76.31L.3 7.2a1.058 1.058 0 0 0 .013 1.489 1.074 1.074 0 0 0 1.5.013Z"
    />
  </svg>
);
export default SvgComponent;

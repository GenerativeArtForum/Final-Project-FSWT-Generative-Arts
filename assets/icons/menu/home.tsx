import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1}
      d="M10.171.966a2.125 2.125 0 0 1 2.656 0l7.875 6.3c.504.403.798 1.014.798 1.66v10.529a2.125 2.125 0 0 1-2.125 2.125h-3.75a.625.625 0 0 1-.625-.625V12.58H8v8.375a.625.625 0 0 1-.625.625h-3.75A2.125 2.125 0 0 1 1.5 19.455V8.925c0-.645.294-1.255.798-1.659l7.873-6.3Z"
    />
  </svg>
);
export default SvgComponent;

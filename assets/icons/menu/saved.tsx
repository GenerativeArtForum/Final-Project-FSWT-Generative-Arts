import * as React from "react"
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15 18.125-5-5-5 5v-15a1.25 1.25 0 0 1 1.25-1.25h7.5A1.25 1.25 0 0 1 15 3.125v15Z"
    />
  </svg>
)
export default SvgComponent

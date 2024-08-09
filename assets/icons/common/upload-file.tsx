import * as React from "react"
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 12.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1H8L11.5 4v8.5Z"
    />
    <path
      stroke={props.stroke || "#444"}
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8 6.5-2-2-2 2M6 4.5V10"
    />
  </svg>
)
export default SvgComponent

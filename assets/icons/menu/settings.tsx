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
      <g clipPath="url(#b)">
        <path
          stroke={props.stroke || "#444"}
          strokeWidth={props.strokeWidth || 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7.471 3.214.615-1.585A1.429 1.429 0 0 1 9.414.714h1.172a1.428 1.428 0 0 1 1.328.915l.615 1.585 2.085 1.2 1.686-.257a1.43 1.43 0 0 1 1.428.7l.572 1a1.428 1.428 0 0 1-.114 1.614L17.143 8.8v2.4l1.071 1.329a1.428 1.428 0 0 1 .114 1.614l-.57 1a1.43 1.43 0 0 1-1.43.7l-1.685-.257-2.086 1.2-.614 1.585a1.428 1.428 0 0 1-1.329.915h-1.2a1.428 1.428 0 0 1-1.328-.915l-.615-1.585-2.085-1.2-1.686.257a1.43 1.43 0 0 1-1.429-.7l-.571-1a1.429 1.429 0 0 1 .114-1.614L2.857 11.2V8.8L1.786 7.471a1.429 1.429 0 0 1-.115-1.614l.572-1a1.429 1.429 0 0 1 1.428-.7l1.686.257 2.114-1.2ZM7.143 10a2.857 2.857 0 1 0 5.715 0 2.857 2.857 0 0 0-5.715 0Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent

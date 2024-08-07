import * as React from "react";

import { Colors } from "@/constants/Colors";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g
      stroke={Colors.blue}
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <path d="M1 3.5h12M2.5 3.5h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9ZM4.5 3.5V3a2.5 2.5 0 1 1 5 0v.5M5.5 6.501v4.002M8.5 6.501v4.002" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;

import styled, { keyframes } from "styled-components";

import { Colors } from "@/constants/Colors";
import { PageWrapperStyles } from "@/styles/pageWrapperStyles";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const HomePageWrapper = styled.div`
  ${PageWrapperStyles}

  margin-top: 0px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
  }

  .loading {
    background: linear-gradient(
      45deg,
      ${Colors.lightgray} 25%,
      ${Colors.midGray} 50%,
      ${Colors.lightgray} 75%
    );
    opacity: 0.5;
    background-size: 1000px 100%;
    animation: ${shimmer} 10s infinite;
    border-radius: 16px;
    height: 200px;
    width: 100%;
  }
`;

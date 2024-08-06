import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const SmallButtonWrapper = styled.div<{ variant: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ variant }) =>
    variant === 1 ? Colors.blue : Colors.pureWhite};
  padding: 6px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  transition: 0.15s ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

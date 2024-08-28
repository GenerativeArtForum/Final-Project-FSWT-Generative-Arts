import styled from "styled-components";

import { Colors, TagColors } from "@/constants/Colors";

export const ButtonWrapper = styled.button<{ variant: number }>`
  background-color: ${({ variant }) =>
    variant === 1
      ? Colors.pureBlack
      : variant === 2
      ? Colors.pureWhite
      : TagColors.background};
  color: ${({ variant }) =>
    variant === 1
      ? Colors.pureWhite
      : variant === 2
      ? Colors.pureBlack
      : TagColors.text};
  padding: 8px 14px;
  border: ${({ variant }) =>
    variant === 1
      ? `1px solid ${Colors.pureBlack}`
      : variant === 2
      ? `1px solid ${Colors.lightgray}`
      : `1px solid ${TagColors.border}`};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    opacity: 0.8;
  }
`;

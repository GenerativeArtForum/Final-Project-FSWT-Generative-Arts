import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const ButtonWrapper = styled.button<{ variant: number }>`
  background-color: ${({ variant }) =>
    variant === 1 ? Colors.pureBlack : Colors.pureWhite};
  color: ${({ variant }) =>
    variant === 1 ? Colors.pureWhite : Colors.pureBlack};
  padding: 8px 14px;
  border: ${({ variant }) =>
    variant === 1
      ? `1px solid ${Colors.pureBlack}`
      : `1px solid ${Colors.gray}`};
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    opacity: 0.8;
  }
`;

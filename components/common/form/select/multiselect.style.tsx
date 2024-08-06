import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const MultiSelectWrapper = styled.select`
  border: 1px solid ${Colors.lightgray};
  border-radius: 8px;
  outline: none;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 12px 8px;
  font-size: 14px;
  background-color: transparent;
  transition: 0.25s ease;

  &:hover {
    border: 1px solid ${Colors.lightBlue};
  }
`;

import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const ThreadActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 4px 8px;
    border: none;
    background-color: ${Colors.pureWhite};
    border-radius: 8px;
    color: ${Colors.gray};
    border: 1px solid ${Colors.lightgray};
    font-size: 14px;
    cursor: pointer;
    transition: 0.25s ease-in-out;

    &:hover {
      background-color: ${Colors.lightgray};
    }
  }
`;

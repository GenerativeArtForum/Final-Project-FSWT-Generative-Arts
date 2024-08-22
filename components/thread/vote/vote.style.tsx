import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const VoteWrapper = styled.div<{ isPositive: boolean }>`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  color: ${(props) => (props.isPositive ? Colors.blue : Colors.pureBlack)};

  .vote {
    cursor: pointer;
  }
`;

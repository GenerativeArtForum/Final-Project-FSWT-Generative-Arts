import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  gap: 8px;

  .body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;

    .text {
      flex: 1;
    }
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;

    .username {
      font-weight: 500;
      font-size: 14px;
      color: ${Colors.pureBlack};
    }

    .date {
      font-weight: 400;
      font-size: 13px;
      color: ${Colors.gray};
    }
  }
`;

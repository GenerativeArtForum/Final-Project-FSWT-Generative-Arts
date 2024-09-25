import styled from "styled-components";
import { Colors, TagColors } from "@/constants/Colors";

export const ThreadUserWrapper = styled.div<{
  isfollowing: boolean | undefined;
}>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;

  .user-data {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .user-name {
      font-weight: 500;
      font-size: 14px;
    }

    .thread-date {
      font-size: 12px;
      color: ${Colors.gray};
    }
  }

  .user-image {
    position: relative;

    .image {
      flex: 1;
      min-width: 36px;
      min-height: 36px;
      border-radius: 100%;
    }

    .image-fallback {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${Colors.lightgray};
    }

    .follow-button {
      position: absolute;
      bottom: -4px;
      left: -4px;
      background-color: ${(props) =>
        props.isfollowing ? TagColors.background : Colors.pureWhite};
      border: 1px solid
        ${(props) => (props.isfollowing ? TagColors.border : Colors.gray)};
      border-radius: 50%;
    }
  }
`;

import styled from "styled-components";

import { Colors, TagColors } from "@/constants/Colors";

export const UserProfileWrapper = styled.div<{
  isFollowing: boolean | undefined;
}>`
  position: relative;
  width: calc(100% + 2px);
  min-height: 200px;
  background-color: ${Colors.lightgray};

  .user-container {
    position: absolute;
    top: 100px;
    left: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 36px;
  }

  .user-image {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: ${Colors.lightgray};
    border: 2px solid ${Colors.pureWhite};
  }

  .user-data {
    margin-top: 75px;
  }

  .first-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
  }

  .username {
    height: 100%;
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
  }

  .following-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .following-text {
    font-size: 12px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }

  .follow-button {
    background-color: ${(props) =>
      props.isFollowing ? TagColors.background : Colors.pureWhite};
    border: 1px solid
      ${(props) => (props.isFollowing ? TagColors.border : Colors.gray)};
    border-radius: 25%;
  }
`;

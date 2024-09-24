import styled from "styled-components";
import { Colors, TagColors } from "@/constants/Colors";

export const UserProfileWrapper = styled.div<{
  isFollowing: boolean | undefined;
  backgroundImage: string | null;
}>`
  position: relative;
  width: calc(100% + 2px);
  min-height: 200px;
  background-color: ${Colors.lightgray};
  margin-bottom: 100px;

  .cover-photo {
    position: absolute;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .user-container {
    position: absolute;
    top: 100px;
    left: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 36px;
  }

  .user-image,
  .image-fallback {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: ${Colors.lightgray};
    border: 2px solid ${Colors.pureWhite};
  }

  .user-data {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    margin-top: 100px;
  }

  .first-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .edit-btn{
    margin-top: 4px;
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

import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const SideBarWrapper = styled.nav`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: "Inter", sans-serif;
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: calc(100vh - 64px);
  padding-left: 32px;
  min-width: max(200px, 15vw);
  border-left: 1.5px solid ${Colors.lightgray};
  background-color: ${Colors.pureWhite};
  margin-top: 30px;

  h3 {
    font-size: 18px;
    font-weight: 400;
    color: ${Colors.pureBlack};
  }

  .side-tags-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .side-tag {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    padding-right: 8px;
    padding-bottom: 4px;
    width: fit-content;
    border-bottom: 1.5px solid ${Colors.transparent};
    transition: 0.25s ease;

    &:hover {
      color: ${Colors.blue};
      border-bottom: 1.5px solid ${Colors.lightBlue};
    }
  }

  .side-users-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .user-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    border-radius: 8px;
    padding: 4px 8px;
    margin-left: -8px;
    transition: 0.25s ease;

    &:hover {
      background-color: ${Colors.white};
    }
  }

  .image {
    width: 20px;
    height: 20px;
    background-color: ${Colors.lightgray};
    border-radius: 20px;
  }

  .user-data {
    display: flex;
    flex-direction: column;
    gap: 0px;
  }

  .user-name {
    font-size: 12px;
    font-weight: 500;
  }

  .user-tag {
    font-size: 11px;
    font-weight: 400;
  }
`;

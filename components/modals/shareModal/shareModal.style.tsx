import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const ShareModalWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;
  padding: 2rem 2rem;
  max-height: 70vh;
  gap: 16px;

  h1 {
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .cross {
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: ${Colors.pureWhite};
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: ${Colors.lightgray};
      }
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin: 0;
    gap: 24px;
    background-color: ${Colors.pureWhite};

    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-size: 14px;
      gap: 8px;

      .button-icon {
        cursor: pointer;
        padding: 16px;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
      }
      &:hover > .button-icon {
        background-color: ${Colors.lighterBlue};
      }
    }
  }

  .share-link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;

    p {
      font-size: 14px;
      font-weight: 400;
    }

    .link-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      input {
        width: 100%;
        padding: 8px;
        border: 1px solid ${Colors.lightgray};
        background-color: ${Colors.pureWhite};
        border-radius: 8px 0 0 8px;
        font-size: 14px;
        font-weight: 500;
      }

      button {
        padding: 8px;
        border: 1px solid ${Colors.blue};
        background-color: ${Colors.blue};
        color: ${Colors.pureWhite};
        font-size: 14px;
        font-weight: 500;
        border-radius: 0 8px 8px 0;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          border: 1px solid ${Colors.lightBlue};
          background-color: ${Colors.lightBlue};
        }
      }
    }
  }
`;

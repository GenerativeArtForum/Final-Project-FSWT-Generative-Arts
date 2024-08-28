import { Colors, TagColors } from "@/constants/Colors";
import styled from "styled-components";

export const MultiSelectWrapper = styled.div`
  position: relative;
  width: 100%;

  .input {
    border: 1px solid ${Colors.lightgray};
    border-radius: 8px;
    outline: none;
    flex: 1;
    width: 100%;
    height: 48px;
    padding: 12px 8px;
    font-size: 14px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    cursor: pointer;

    transition: 0.25s ease;

    .tags {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 8px;
    }

    .placeholder {
      user-select: none;
      pointer-events: none;
      border: none;
      outline: none;

      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 8px;
    }

    .selected-options {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .options-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      gap: 8px;
    }
  }

  .options {
    padding-top: 8px;
  }

  .dropdown {
    position: relative;
    border: 1px solid ${Colors.lightgray};
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 8px;
    background: white;
    z-index: 10;

    display: flex;
    flex-direction: column;
    height: 300px;
    overflow-y: auto;
    padding: 8px;
    padding-top: 0;
    margin-top: 4px;
  }

  .search-bar {
    position: sticky;
    top: 0;
    background-color: ${Colors.pureWhite};
    padding-top: 8px;
  }

  .checkbox-label {
    display: flex;
    padding: 8px;
    gap: 8px;
    text-align: left;
    background: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.25s ease;

    button {
      transition: 0.25s;
    }

    &:hover {
      background: ${TagColors.background};

      button {
        color: ${Colors.blue};
      }
    }
  }

  .feedback {
    position: absolute;
    height: 50px;
    left: 0;
    width: 100%;
    background-color: ${Colors.red};
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 14px;
    border-radius: 8px;
    z-index: 20;
    transition: opacity 0.5s ease;
    opacity: 0.9;
  }

  .tag-not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 500;
    }

    button {
      padding-bottom: 4px;
      border-bottom: 1.5px solid ${Colors.transparent};
      transition: 0.25s ease;

      &:hover {
        color: ${Colors.blue};
        border-bottom: 1.5px solid ${Colors.lightBlue};
      }
    }
  }
`;

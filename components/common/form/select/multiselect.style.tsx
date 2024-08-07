import { Colors, TagColors } from "@/constants/Colors";
import styled from "styled-components";

export const MultiSelectWrapper = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;

  .input {
    border: 1px solid ${Colors.lightgray};
    border-radius: 8px;
    outline: none;
    flex: 1;
    max-width: 400px;
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

    &:hover {
      border: 1px solid ${Colors.gray};
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

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    max-width: 400px;
    width: 100%;
    border: none;
    border-radius: 8px;
    background: white;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
    margin-top: 4px;
    z-index: 10;

    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: auto;
    padding: 8px;
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
`;

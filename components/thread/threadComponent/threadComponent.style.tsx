import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const ThreadWrapper = styled.div`
  border: none;
  border-radius: 16px;
  background-color: ${Colors.pureWhite};
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  max-width: 600px;
  height: fit-content;
  padding: 24px;
  font-size: 14px;
  gap: 16px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  transition: 0.25s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 20px;
    font-weight: 500;
  }

  .thread-header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .thread-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: ${Colors.gray};

    .data {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }

  .images {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .image {
    max-width: 100%;
    height: auto;
  }
`;

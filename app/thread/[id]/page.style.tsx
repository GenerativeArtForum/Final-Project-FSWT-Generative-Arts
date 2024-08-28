import styled from "styled-components";

import { Colors } from "@/constants/Colors";
import { PageWrapperStyles } from "@/styles/pageWrapperStyles";

export const ThreadPageWrapper = styled.div`
  ${PageWrapperStyles}

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin-top: 24px;
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
    margin-bottom: 12px;
    color: ${Colors.gray};

    .data {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }

  .responses-wrapper {
    margin-bottom: 64px;
  }

  .responses {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    gap: 24px;
    margin-bottom: 16px;
  }

  .more-less {
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 4px;
    width: fit-content;
    transition: 0.25s ease;

    &:hover {
      color: ${Colors.blue};
    }
  }
`;

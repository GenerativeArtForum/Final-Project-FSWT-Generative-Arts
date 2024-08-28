import styled from "styled-components";

import { Colors } from "@/constants/Colors";

import { PageWrapperStyles } from "@/styles/pageWrapperStyles";

export const NotFoundPageWrapper = styled.div`
  ${PageWrapperStyles}

  text-align: center;
  gap: 16px;
  padding: 0 32px;
  margin-top: 5vw;

  h1 {
    font-size: 96px;
    font-weight: 700;
    color: ${Colors.blue};
    padding: 0;
    margin-bottom: -48px;
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
    color: ${Colors.blue};
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: ${Colors.lightBlack};
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
  }
`;

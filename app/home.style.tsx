import styled from "styled-components";
import { PageWrapperStyles } from "@/styles/pageWrapperStyles";


export const HomePageWrapper = styled.div`
  ${PageWrapperStyles}
  margin-top: 0px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
  }
`;

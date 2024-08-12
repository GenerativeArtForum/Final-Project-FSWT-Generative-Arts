import { PageWrapperStyles } from "@/styles/pageWrapperStyles";
import styled from "styled-components";

export const SearchPageWrapper = styled.div`
  ${PageWrapperStyles}

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

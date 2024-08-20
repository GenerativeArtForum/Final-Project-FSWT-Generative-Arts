import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const ConfirmModalWrapper = styled.div`
  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
    padding: 2rem;
    max-height: 70vh;
    gap: 32px;
  }

  h1 {
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    width: 100%;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    margin: 0;
    gap: 8px;
    background-color: ${Colors.pureWhite};
  }
`;

import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const NewResponseModalWrapper = styled.div`
  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
    padding: 3rem 4rem;
    max-height: 70vh;
  }

  h1 {
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
  }

  .input-label {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 300;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    margin: 0;
    padding: 1rem 2rem;
    gap: 8px;
    background-color: ${Colors.pureWhite};
    border-top: 1px solid ${Colors.lightgray};
  }
`;

import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const NewThreadModalWrapper = styled.div<{ isOpenModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ isOpenModal }) => (isOpenModal ? 999 : -1)};
  opacity: ${({ isOpenModal }) => (isOpenModal ? 1 : 0)};
  pointer-events: ${({ isOpenModal }) => (isOpenModal ? "auto" : "none")};
  backdrop-filter: blur(2px);
  overflow: ${({ isOpenModal }) => (isOpenModal ? "auto" : "hidden")};
  transition: 0.25s;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-width: 500px;
    width: fit-content;
    background-color: ${Colors.pureWhite};
    padding: 2rem 4rem;
    border-radius: 16px;
    z-index: 2;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    width: 100%;
    max-width: 450px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 450px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 450px;
    gap: 4px;
  }

  .input-label {
    font-size: 14px;
    fonft-family: "Inter", sans-serif;
    font-weight: 300;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    max-width: 450px;
    width: 100%;
    gap: 8px;
  }

  .error-message {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    height: 20px;
    color: ${Colors.red};
  }
`;

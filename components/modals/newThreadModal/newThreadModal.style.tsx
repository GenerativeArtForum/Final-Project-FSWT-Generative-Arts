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
  transition: opacity 0.25s ease-in-out;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  h2 {
    padding-bottom: 1rem;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-width: 1200px;
    max-height: 90vh;
    width: fit-content;
    background-color: ${Colors.pureWhite};
    border-radius: 16px;
    z-index: 2;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
    padding: 3rem 4rem;
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

  .error-message {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    height: 20px;
    color: ${Colors.red};
  }
`;

import styled from "styled-components";
import { Colors } from "@/constants/Colors";

export const ModalWrapper = styled.div<{ isOpen: boolean | undefined }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  backdrop-filter: blur(2px);
  transition: opacity 0.15s ease-in-out;

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
    max-width: calc(55vw + 60px);
    max-height: 90vh;
    background-color: ${Colors.pureWhite};
    border-radius: 16px;
    transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(5%)")};
    z-index: 2;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.15s ease-out, opacity 0.15s ease-in-out;
  }
`;

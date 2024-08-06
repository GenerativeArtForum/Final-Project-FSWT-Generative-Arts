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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    background-color: ${Colors.pureWhite};
    padding: 2rem 4rem;
    border-radius: 16px;
    z-index: 2;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  }
`;

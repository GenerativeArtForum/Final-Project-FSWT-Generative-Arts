import styled from "styled-components";

import {
  Toast as BaseToast,
  ToastClose as BaseToastClose,
  ToastViewport as BaseToastViewport,
} from "@/components/ui/toast";

import { Colors } from "@/constants/Colors";

export const SuccessToast = styled(BaseToast)`
  background-color: ${Colors.pureWhite};
  color: ${Colors.black};
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${Colors.lightgray};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${Colors.blue};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px ${Colors.blue};
    animation: fill 0.4s ease-in-out 0.4s forwards,
      scale 0.3s ease-in-out 0.9s both;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px ${Colors.blue};
    }
  }
`;

export const SuccessToastTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const SuccessToastClose = styled(BaseToastClose)`
  color: ${Colors.black};
`;

export const SuccessToastViewport = styled(BaseToastViewport)`
  top: 20px;
  position: fixed;
  z-index: 9999;
`;

export const ErrorToastViewport = styled(BaseToastViewport)`
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 9999;
  pointer-events: none;
`;

export const ErrorToast = styled(BaseToast)`
  background-color: ${Colors.red};
  color: ${Colors.white};
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${Colors.lightgray};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  pointer-events: auto;
  transition: opacity 0.3s ease;
  opacity: 1;
`;

export const ErrorToastTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const ErrorToastClose = styled(BaseToastClose)`
  color: ${Colors.white};
`;

export const SuccessToastDescription = styled.div`
  font-size: 14px;
  color: ${Colors.black};
`;

export const ErrorToastDescription = styled.div`
  font-size: 14px;
  color: ${Colors.white};
`;
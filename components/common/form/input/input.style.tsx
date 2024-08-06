import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const InputWrapper = styled.input<{ variant?: number }>`
  border: ${(props) =>
    props.variant === 2 ? `1px solid ${Colors.lightgray}` : "none"};
  border-radius: 8px;
  outline: none;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.variant === 2 ? "12px 8px" : "12px 0")};
  font-size: 14px;
  background-color: transparent;
  transition: 0.25s ease;

  &:hover {
    border: ${(props) =>
      props.variant === 2 ? `1px solid ${Colors.gray}` : "none"};
  }
`;

export const InputWrapperArea = styled.textarea<{ variant?: number }>`
  border: ${(props) =>
    props.variant === 2 ? `1px solid ${Colors.lightgray}` : "none"};
  border-radius: 8px;
  outline: none;
  flex: 1;
  width: 100%;
  resize: none;
  padding: ${(props) => (props.variant === 2 ? "8px 8px" : "12px 0")};
  font-size: 14px;
  background-color: transparent;
  transition: 0.25s ease;

  &:hover {
    border: ${(props) =>
      props.variant === 2 ? `1px solid ${Colors.gray}` : "none"};
  }
`;

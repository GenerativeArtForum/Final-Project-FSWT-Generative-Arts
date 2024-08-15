import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const SearchBarWrapper = styled.div<{
  variant: number | undefined;
}>`
  border: ${(props) => props.variant === 0 && `1px solid ${Colors.lightgray}`};
  border-radius: ${(props) => (props.variant === 1 ? "16px" : "8px")};
  background-color: ${Colors.pureWhite};
  outline: none;
  display: flex;
  align-items: ${(props) =>
    props.variant === 1 || props.variant === 2 ? "center" : "space-between"};
  justify-content: ${(props) =>
    props.variant === 1 || props.variant === 2 ? "flex-start" : "center"};
  flex: 1;
  width: 100%;
  height: fit-content;
  padding: ${(props) => (props.variant === 2 ? "12px 8px" : "12px 12px")};
  font-size: 14px;
  box-shadow: ${(props) =>
    props.variant === 1 || props.variant === 2
      ? "0px 0px 12px 0px rgba(0, 0, 0, 0.05)"
      : ""};
  transition: 0.25s ease-in-out;
  max-width: ${(props) => props.variant === 2 && "225px"};

  &:focus-within,
  &:hover {
    box-shadow: ${(props) =>
      props.variant === 1 || props.variant === 2
        ? "0px 0px 12px 0px rgba(0, 0, 0, 0.1)"
        : ""};
  }

  input {
    flex: 1;
  }

  .icon {
    width: ${(props) => (props.variant === 1 ? "22px" : "16px")};
    height: ${(props) => (props.variant === 1 ? "22px" : "16px")};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: ${(props) => (props.variant === 1 ? "8px" : "4px")};
  }

  .cross {
    width: 18px;
    height: 18px;
    padding: 4px;
  }
`;

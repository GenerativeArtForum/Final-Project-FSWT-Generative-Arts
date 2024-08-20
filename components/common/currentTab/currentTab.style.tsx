import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const CurrentTabWrapper = styled.button<{
  isActive: boolean | undefined;
}>`
  color: ${(props) => (props.isActive ? Colors.blue : Colors.lightBlack)};
  border-bottom: 1.5px solid
    ${(props) => (props.isActive ? Colors.blue : Colors.transparent)};
  padding: 0.25rem 0.67rem;
  text-align: center;
  transition: 0.25s;
`;

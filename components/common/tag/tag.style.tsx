import styled from "styled-components";

import { TagColors } from "@/constants/Colors";

export const TagWrapper = styled.div`
  border: 1px solid ${TagColors.border};
  background-color: ${TagColors.background};
  color: ${TagColors.text};
  font-size: 14px;
  font-family: "Inter", sans-serif;
  border-radius: 6px;
  padding: 4px 8px;
  text-align: center;
  width: fit-content;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
  }
`;

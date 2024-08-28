import styled from "styled-components";

import { Colors, TagColors } from "@/constants/Colors";

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
  position: relative;
  transition: 0.25s;

  &:hover {
    .bin-icon {
      opacity: 1;
    }
  }

  .bin-icon {
    position: absolute;
    z-index: 2;
    right: 2.5px;
    top: 2.5px;
    width: 24px;
    height: 24px;
    padding: 4px;
    background-color: ${TagColors.background};
    border-radius: 6px;
    border: 1px solid ${TagColors.border};
    opacity: 0;
    transition: 0.25s;
  }
`;

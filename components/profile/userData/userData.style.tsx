import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const UserDataWrapper = styled.div`
  width: calc(100% + 2px);
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .bio-text {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    max-width: 67%;
    text-align: center;
    border-bottom: 1.5px solid ${Colors.lightgray};
    padding: 16px 32px;
  }

  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
  }

  .about-text {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const SearchBarWrapper = styled.div`
  border: 1px solid ${Colors.lightgray};
  border-radius: 8px;
  outline: none;
  display: flex;
  align-items: space-between;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 8px 8px;
  margin-bottom: 8px;
  font-size: 14px;

  input {
    flex: 1;
  }

  .cross {
    width: 18px;
    height: 18px;
    padding: 4px;
  }
`;

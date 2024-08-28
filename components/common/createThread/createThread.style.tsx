import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const CreateThreadWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
  height: 50px;
  border-radius: 16px;
  background-color: ${Colors.pureWhite};
  padding: 12px 16px;
  font-size: 14px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: 0.25s;

  &:focus-within,&:hover {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  }

  form {
    flex: 1;
  }
`;

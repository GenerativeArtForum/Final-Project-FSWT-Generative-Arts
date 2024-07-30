import styled from "styled-components";

export const MenuWrapper = styled.nav`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  font-family: "Inter", sans-serif;
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: calc(100vh - 64px);
  padding-right: 32px;
  border-right: 1.5px solid #e5e7eb;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

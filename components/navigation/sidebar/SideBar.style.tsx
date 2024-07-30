import styled from "styled-components";

export const SideBarWrapper = styled.nav`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: "Inter", sans-serif;
  padding-top: 8px;
  padding-bottom: 8px;
  min-width: 140px;
  min-height: calc(100vh - 64px);
  padding-left: 32px;
  border-left: 1.5px solid #e5e7eb;
`;

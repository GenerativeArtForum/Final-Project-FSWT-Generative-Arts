import Link from "next/link";

import styled from "styled-components";

export const MenuLogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  width: fit-content;
  padding: 8px 16px;
`;

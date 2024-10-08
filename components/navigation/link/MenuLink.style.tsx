import Link from "next/link";

import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const MenuLinkWrapper = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Inter", sans-serif;
  color: ${(props) => (props.$active ? Colors.blue : Colors.gray)};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  min-width: 140px;
  border-radius: 8px;
  width: fit-content;
  padding: 8px 16px;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${Colors.white};
  }
`;

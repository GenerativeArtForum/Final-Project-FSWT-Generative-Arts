import { Colors } from "@/constants/Colors";

import styled from "styled-components";


export const CurrentTabWrapper = styled.button<{isActive: boolean}>`
    color: ${(props) => (props.isActive ? Colors.blue : Colors.lightBlack)};
    border-bottom: 1.5px solid ${(props) => (props.isActive ? Colors.blue : Colors.transparent)};
    padding: 0.25rem 0.67rem;
    text-align: center;
    transition: 0.25s;
`;
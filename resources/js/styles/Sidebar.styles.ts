import styled, { css } from "styled-components";

export const SidebarRoot = styled.div(
    ({ theme }) => css`
        height: 100%;
        width: 130px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        border-right: 1px solid #e9e9e9;
    `
);

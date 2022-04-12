import styled, { css } from "styled-components";

export const AppRoot = styled.div(
    ({ theme }) => css`
        height: inherit;
        width: inherit;
        display: flex;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
        flex-direction: column;
    `
);

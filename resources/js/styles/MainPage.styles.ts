import styled, { css } from "styled-components";

export const MainPageRoot = styled.div(
    ({ theme }) => css`
        /* flex: 1;
        display: flex;
        box-sizing: border-box; */
    `
);

export const DataGridWrapper = styled.div(
    ({ theme }) => css`
        width: 100%;
        height: 80vh;
        box-sizing: border-box;

        p {
            margin: 0;
        }
    `
);

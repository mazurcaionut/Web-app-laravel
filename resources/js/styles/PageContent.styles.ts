import styled, { css } from "styled-components";

export const PageContentRoot = styled.div(
    ({ theme }) => css`
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-left: 120px;
        padding: 30px 120px 30px 120px;
    `
);

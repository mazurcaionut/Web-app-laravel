import styled, { css } from "styled-components";
import Logo from "../../images/BlackIdeaFactory.png";

export const GuestPageRoot = styled.div(
    ({ theme }) => css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(
            to bottom,
            black 0%,
            black 50%,
            white 50%,
            white 100%
        );
    `
);

export const GuestPageLogo = styled.div(
    ({ theme }) => css`
        background-image: url(${Logo});
        background-size: cover;
        background-position: center;
        width: 300px;
        height: 150px;
    `
);

export const FormContainer = styled.div(
    ({ theme }) => css`
        background-color: white;
        width: 400px;
        height: fit-content;
        box-sizing: border-box;
        padding: 30px 50px 30px 50px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        box-shadow: 0 0 10px #bbb;
    `
);

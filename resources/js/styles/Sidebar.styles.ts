import { Icon } from "@blueprintjs/core";
import styled, { css } from "styled-components";
import Logo from "../../images/WhiteIdeaFactory.png";

export const SidebarRoot = styled.div(
    ({ theme }) => css`
        height: 100vh;
        position: fixed;
        width: 120px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        border-right: 1px solid #e9e9e9;
    `
);

export const MiddleIcons = styled.div(
    ({ theme }) => css`
        display: flex;
        gap: 50px;
        flex-direction: column;
    `
);

export const LogoutButton = styled(Icon)(
    ({ theme }) => css`
        svg {
            transform: rotate(180deg);
        }
        cursor: pointer;
    `
);

export const LogoContainer = styled.div(
    ({ theme }) => css`
        background-image: url(${Logo});
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 200px;
        cursor: pointer;
    `
);

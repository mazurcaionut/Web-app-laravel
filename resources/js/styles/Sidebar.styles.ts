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

interface IUserAvatar {
    size?: number;
}

export const UserAvatar = styled.div<IUserAvatar>(
    ({ theme, size = 40 }) => css`
        border-radius: ${size}px;
        width: ${size}px;
        height: ${size}px;
        overflow: hidden;
        border: 1px solid transparent;
        background-image: linear-gradient(#017699, #017699),
            linear-gradient(to bottom, #e9e9e9 0%, #e9e9e9 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        cursor: pointer;
        transition: all 0.4s ease;
    `
);

export const AvatarImg = styled.img<IUserAvatar>(
    ({ theme, size = 40 }) => css`
        width: ${size}px;
        height: ${size}px;
    `
);

export const TabRoot = styled.div(
    ({ theme }) => css`
        text-align: center;
        align-self: center;

        & .bp4-tab {
            color: grey !important;
            outline: none;
        }

        & .bp4-tab-list {
            width: fit-content;
        }

        & .bp4-tab-indicator {
            background-color: black !important;
            /* color: black !important; */
        }

        & .bp4-tab[aria-selected="true"] {
            color: black !important;
            /* background-color: black !important; */
        }
    `
);

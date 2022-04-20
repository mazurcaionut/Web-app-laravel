import styled, { css } from "styled-components";

interface ICommentItemRoot {
    enableAnimation?: boolean;
    margin?: boolean;
}

export const CommentItemRoot = styled.div<ICommentItemRoot>(
    ({ theme, enableAnimation, margin }) => css`
        display: flex;
        flex-direction: column;
        gap: 10px;

        ${margin &&
        css`
            margin-left: 30px;
        `}

        ${enableAnimation &&
        css`
            animation: blink 2s linear 2;
        `}

        @keyframes blink {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `
);

interface ICommentContent {
    enableAnimation?: boolean;
}

export const CommentContent = styled.div<ICommentContent>(
    ({ theme, enableAnimation }) => css`
        ${enableAnimation &&
        css`
            animation: blink 2s linear 2;
        `}

        @keyframes blink {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `
);

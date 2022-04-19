import styled, { css } from "styled-components";

export const ListPostItemRoot = styled.div(
    ({ theme }) => css`
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        height: 200px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        gap: 10px;
        box-sizing: border-box;
        flex-direction: row;
        overflow: hidden;
        cursor: pointer;
    `
);

interface IPostDescription {
    rows?: number;
}

export const ListPostItemDescription = styled.p<IPostDescription>(
    ({ theme, rows }) => css`
        margin: 0;
        letter-spacing: 1px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;

        ${rows &&
        css`
            -webkit-line-clamp: ${rows};
            -webkit-box-orient: vertical;
        `}
    `
);

export const ListPostItemTitle = styled.p(
    ({ theme }) => css`
        margin: 0;
        font-weight: bold;
        font-size: 30px;
        letter-spacing: 1px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    `
);

interface IPostImage {
    image: string;
    height?: number;
    width?: number;
}

export const PostImage = styled.div<IPostImage>(
    ({ theme, image, height, width }) => css`
        height: 100%;
        min-width: 300px;
        background-image: url(${image});
        background-size: cover;
        background-position: center;

        ${height &&
        css`
            height: ${height}px;
        `}

        ${width &&
        css`
            width: ${width}px;
        `}
    `
);

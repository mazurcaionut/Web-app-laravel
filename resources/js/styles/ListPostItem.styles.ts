import styled, { css } from "styled-components";

export const ListPostItemRoot = styled.div(
    ({ theme }) => css`
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        height: 200px;
        display: flex;
        padding: 20px;
        gap: 10px;
        box-sizing: border-box;
        flex-direction: row;
        overflow: hidden;
        cursor: pointer;
    `
);

export const ListPostItemDescription = styled.p(
    ({ theme }) => css`
        margin: 0;
        letter-spacing: 1px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
}

export const PostImage = styled.div<IPostImage>(
    ({ theme, image }) => css`
        height: 100%;
        min-width: 300px;
        background-image: url(${image});
        background-size: cover;
        background-position: center;
    `
);

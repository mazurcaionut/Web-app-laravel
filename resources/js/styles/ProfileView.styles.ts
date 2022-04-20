import { Button, Dialog } from "@blueprintjs/core";
import styled, { css } from "styled-components";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export const DialogRoot = styled(Dialog)(
    ({ theme }) => css`
        width: 40vw;
        border-radius: 15px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
    `
);

export const DialogHeader = styled.div(
    ({ theme }) => css`
        width: 100%;
        padding: 15px;
        height: fit-content;
        background-color: lightgrey;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 10px;
    `
);

export const DialogContent = styled.div(
    ({ theme }) => css`
        flex: 1;
        box-sizing: border-box;
        /* padding: 20px; */
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `
);

export const DialogFooter = styled.div(
    ({ theme }) => css`
        width: 100%;
        padding: 15px;
        height: fit-content;
        background-color: lightgrey;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
    `
);

export const SaveChangesButton = styled(Button)(
    ({ theme }) => css`
        background-color: black !important;
        color: white !important;
    `
);

export const LockIcon = styled(BsEyeFill)(
    ({ theme }) => css`
        cursor: pointer;
        right: 15px;
        top: 5px;
        position: relative;
    `
);

export const UnlockIcon = styled(BsEyeSlashFill)(
    ({ theme }) => css`
        cursor: pointer;
        right: 15px;
        top: 5px;
        position: relative;
    `
);

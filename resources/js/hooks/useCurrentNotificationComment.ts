import React, { createContext, useContext } from "react";

export type ToastProps = {
    message: string;
    intent?: "success" | "error" | "warning" | "info";
};

export type IToastContext = (args: ToastProps) => void;

export type ICurrentNotificationCommentContext = [
    number | null,
    React.Dispatch<React.SetStateAction<number | null>>
];

export const CurrentNotificationCommentContext =
    createContext<ICurrentNotificationCommentContext>([null, () => {}]);

export const useCurrentNotificationComment = () => {
    const commentIndex = useContext(CurrentNotificationCommentContext);

    return commentIndex;
};

import { createContext, useContext } from "react";

export type ToastProps = {
    message: string;
    intent?: "success" | "error" | "warning" | "info";
};

export type IToastContext = (args: ToastProps) => void;

export const ToastContext = createContext<IToastContext>(() => {});

export const useToast = () => {
    const show = useContext(ToastContext);

    return show;
};

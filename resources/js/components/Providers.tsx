import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { ToastContext, ToastProps } from "../hooks/useToast";

interface ProviderProps {
    children: JSX.Element;
}

export const Providers = ({ children }: ProviderProps) => {
    const showToast = ({ message, intent = "success" }: ToastProps) =>
        toast[intent](message);

    return (
        <>
            <ToastContext.Provider value={showToast}>
                {children}
            </ToastContext.Provider>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

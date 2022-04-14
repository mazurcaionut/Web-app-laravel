import React from "react";
import { useHistory } from "react-router-dom";
import { MainPageRoot } from "../styles/MainPage.styles";
import { MainPageContent } from "./PageContent";
import { Sidebar } from "./Sidebar";

export const MainPage = () => {
    return (
        <>
            <Sidebar />
            <MainPageContent />
        </>
    );
};

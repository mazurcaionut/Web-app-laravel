import React from "react";
import { useHistory } from "react-router-dom";
import { MainPageRoot } from "../styles/MainPage.styles";
import { Sidebar } from "./Sidebar";

export const MainPage = () => {
    const history = useHistory();

    return (
        <MainPageRoot>
            <Sidebar />
        </MainPageRoot>
    );
};

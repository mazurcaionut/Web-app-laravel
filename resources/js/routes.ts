import React from "react";
import { SecondPage } from "./components/SecondPage";
import { MainPage } from "./components/MainPage";

interface IRoutes {
    component: React.ComponentType<any>;
    path: string;
}

export const publicRoutes = [
    {
        component: MainPage,
        path: "/",
    },
    {
        component: SecondPage,
        path: "/secondPage",
    },
] as IRoutes[];

import React from "react";
import { SecondPage } from "./components/SecondPage";
import { WelcomePage } from "./components/WelcomePage";

interface IRoutes {
    component: React.ComponentType<any>;
    path: string;
}

export const publicRoutes = [
    {
        component: WelcomePage,
        path: "/",
    },
    {
        component: SecondPage,
        path: "/secondPage",
    },
] as IRoutes[];

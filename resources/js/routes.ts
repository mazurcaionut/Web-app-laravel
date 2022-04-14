import React from "react";
import { SecondPage } from "./components/SecondPage";
import { MainPage } from "./components/MainPage";
import { CreatePost } from "./components/CreatePost";

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
        component: CreatePost,
        path: "/createPost",
    },
] as IRoutes[];

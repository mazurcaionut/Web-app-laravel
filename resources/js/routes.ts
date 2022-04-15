import React from "react";
import { SecondPage } from "./components/SecondPage";
import { MainPage } from "./components/MainPage";
import { CreatePost } from "./components/CreatePost";
import { LoginView } from "./components/LoginView";
import { RegisterView } from "./components/RegisterView";
import { NoMatch } from "./components/App";
import { Post } from "./components/Post";

interface IRoutes {
    component: React.ComponentType<any>;
    path: string;
}

export const privateRoutes: IRoutes[] = [
    {
        component: CreatePost,
        path: "/dashboard/create",
    },
    {
        component: Post,
        path: "/dashboard/:id",
    },
    {
        component: MainPage,
        path: "/dashboard",
    },
];

export const publicRoutes: IRoutes[] = [
    {
        component: LoginView,
        path: "/login",
    },
    {
        component: RegisterView,
        path: "/register",
    },
];

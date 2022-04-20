import React from "react";
import { SecondPage } from "./components/SecondPage";
import { MainPage } from "./components/MainPage";
import { CreatePost } from "./components/CreatePost";
import { LoginView } from "./components/LoginView";
import { RegisterView } from "./components/RegisterView";
import { NoMatch } from "./components/App";
import { Post } from "./components/Post";
import { MyPosts } from "./components/MyPosts";
import { UpdatePost } from "./components/UpdatePost";
import { Notifications } from "./components/Notifications";

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
        component: MyPosts,
        path: "/dashboard/myposts",
    },
    {
        component: Notifications,
        path: "/dashboard/notifications",
    },
    {
        component: UpdatePost,
        path: "/dashboard/myposts/:id",
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

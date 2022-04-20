import React from "react";
import { useHistory } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { MainPageRoot } from "../styles/MainPage.styles";
import { MainPageContent } from "./PageContent";
import { Sidebar } from "./Sidebar";

export const MainPage = () => {
    const { posts, loading } = usePosts();

    return (
        <>
            <Sidebar />
            <MainPageContent
                posts={posts}
                loading={loading}
                title="Dashboard"
            />
        </>
    );
};

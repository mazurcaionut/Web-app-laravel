import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePosts } from "../hooks/usePosts";
import { useToast } from "../hooks/useToast";
import { AUTH_TOKEN } from "../storage";
import { MainPageRoot } from "../styles/MainPage.styles";
import { MainPageContent } from "./PageContent";
import { Sidebar } from "./Sidebar";

export const MainPage = () => {
    const { posts, loading, fetchPosts } = usePosts();
    const show = useToast();
    const [token] = useLocalStorage(AUTH_TOKEN);
    const deletePostURL = "posts/delete";

    const deletePost = (id: number) => async (e: any) => {
        e.stopPropagation();
        try {
            const { data } = await axios({
                method: "DELETE",
                url: `http://localhost/api/${deletePostURL}/${id}`,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                responseType: "json",
            });
            show({
                message: "Post deleted successfully",
                intent: "success",
            });

            fetchPosts();
            // console.log("\n\nData comment: ", data, "\n\n");
        } catch ({ message }) {
            show({ message, intent: "error" });
        }
    };

    return (
        <>
            <Sidebar />
            <MainPageContent
                posts={posts}
                loading={loading}
                title="Dashboard"
                deletePost={deletePost}
            />
        </>
    );
};

import axios from "axios";
import React from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePosts } from "../hooks/usePosts";
import { useToast } from "../hooks/useToast";
import { AUTH_TOKEN } from "../storage";
import { MainPageContent } from "./PageContent";
import { Sidebar } from "./Sidebar";

export const MyPosts = () => {
    const { posts, loading, fetchPosts } = usePosts();
    const { user } = useCurrentUser();
    const [token] = useLocalStorage(AUTH_TOKEN);
    const show = useToast();
    const deleteCommentURL = "posts/delete";

    const deletePost = (id: number) => async (e: any) => {
        e.stopPropagation();
        try {
            const { data } = await axios({
                method: "DELETE",
                url: `http://localhost/api/${deleteCommentURL}/${id}`,
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
                posts={posts.filter((post) => post.user_id === user?.id)}
                loading={loading}
                title="My posts"
                deletePost={deletePost}
            />
        </>
    );
};

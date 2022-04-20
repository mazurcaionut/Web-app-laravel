import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";
import { useParams } from "react-router-dom";

// interface IUser {
//     id: number;
//     name: string;
//     email: string;
// }

export interface Notification {
    id: number;
    notifiable_id: number;
    notifiable_type: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    comment?: Comment;
    user?: User;
}

export interface User {
    id: number;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    email_verified_at?: string;
    image?: string;
    name: string;
    comments?: Comment[];
    posts?: Post[];
    notifications?: Notification[];
}

export interface Comment {
    id: number;
    commentable_id: number;
    commentable_type: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    post_id: number;
    comments?: Comment[];
    user?: User;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    comments?: Comment[];
    user?: User;
}

export const useSinglePost = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const [token] = useLocalStorage(AUTH_TOKEN);
    const { id } = useParams<{ id: string }>();

    const fetchPost = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost/api/posts/${id}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            setPost(data.data as Post);
        } catch ({ message }) {
            show({ message: message as string, intent: "error" });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return {
        post,
        loading,
        fetchPost,
    };
};

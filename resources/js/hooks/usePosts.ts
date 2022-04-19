import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";

interface IUser {
    id: number;
    name: string;
    email: string;
}

export const usePosts = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const postsURL = "posts/all";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const fetchUser = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost/api/${postsURL}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            console.log("\n\nData incoming: ", data, "\n\n");

            setPosts(data.data);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        posts,
        loading,
    };
};

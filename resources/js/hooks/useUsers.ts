import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { Post, User } from "./useSinglePost";
import { useToast } from "./useToast";

// interface IUser {
//     id: number;
//     name: string;
//     email: string;
// }

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const usersURL = "users/all";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost/api/${usersURL}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            console.log("\n\nAll users data: ", data, "\n\n");

            setUsers(data.data as User[]);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        fetchUsers,
    };
};

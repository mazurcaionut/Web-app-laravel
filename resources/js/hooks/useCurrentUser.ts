import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";
import DefaultProfile from "../../images/BlankPicture.png";
import { User } from "./useSinglePost";

// export interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     imageURL: string | null;
// }

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const viewProfileURL = "users/view-profile";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const fetchUser = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost/api/${viewProfileURL}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            setCurrentUser(data.data);
            console.log("User: ", data.data);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    const updateUserProfile = async () => {};

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user: currentUser,
        loading,
    };
};

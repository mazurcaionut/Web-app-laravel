import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";
import DefaultProfile from "../../images/BlankPicture.png";
import { Notification, User } from "./useSinglePost";

// export interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     imageURL: string | null;
// }

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const notificationsURL = "users/notifications";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const fetchNotifications = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost/api/${notificationsURL}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            console.log("Notificatgions: ", data.data);
            setNotifications(data.data);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return {
        notifications,
        loading,
    };
};

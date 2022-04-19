import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const history = useHistory();
    const logoutURL = "users/logout";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const logOut = async () => {
        setLoading(true);

        try {
            await axios({
                method: "GET",
                url: `http://localhost/api/${logoutURL}`,
                responseType: "json",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            localStorage.removeItem(AUTH_TOKEN);

            show({
                message: "Logged out successfully",
                intent: "success",
            });
            history.push("/login");
        } catch ({ message }) {
            show({ message: message as string, intent: "error" });
        }

        setLoading(false);
    };

    return {
        logOut,
        loading,
    };
};

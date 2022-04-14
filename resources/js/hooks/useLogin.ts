import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../components/LoginView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const history = useHistory();
    const loginURL = "users/login";
    const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);

    const login = async (submissionData: IUserLogin) => {
        setLoading(true);

        try {
            await axios({
                method: "POST",
                url: `http://localhost/api/${loginURL}`,
                data: JSON.stringify(submissionData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                console.log("Response token: ", response.data.token);

                if (response.data.token) {
                    // const token = response.data.token.replace(/^"(.*)"$/, "$1");
                    const token = response.data.token;

                    setAuthToken(token);

                    show({
                        message: "Logged in successfully",
                        intent: "success",
                    });
                    history.push("/dashboard");
                } else {
                    show({ message: "Token failed", intent: "error" });
                }
            });
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    return {
        login,
        loading,
    };
};

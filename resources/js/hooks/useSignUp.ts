import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IUserRegistration } from "../components/RegisterView";
import { AUTH_TOKEN } from "../storage";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";

export const useSignUp = () => {
    // const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN);
    const signUpURL = "users/register";
    const show = useToast();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    const signUp = async (submissionData: IUserRegistration) => {
        setLoading(true);

        try {
            await axios({
                method: "POST",
                url: `http://localhost/api/${signUpURL}`,
                data: JSON.stringify(submissionData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            show({
                message: "Account created successfully",
                intent: "success",
            });
            history.push("/login");
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    return {
        signUp,
        loading,
    };
};

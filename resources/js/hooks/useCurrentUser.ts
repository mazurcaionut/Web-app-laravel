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

export interface UpdateUserArgs {
    name?: string;
    email?: string;
    image?: FileList;
    password?: string;
    newPassword?: string;
    passwordConfirm?: string;
}

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const show = useToast();
    const updateUserURL = "users/update";
    const viewProfileURL = "users/view-profile";
    const [token] = useLocalStorage(AUTH_TOKEN);

    const onUserUpdate = (fields: UpdateUserArgs) => async () => {
        try {
            const {
                name,
                email,
                image,
                password,
                newPassword,
                passwordConfirm,
            } = fields;

            const data = new FormData();

            if (name) {
                data.append("name", name);
            }

            if (email) {
                data.append("email", email);
            }

            if (image) {
                data.append("image", image[0]);
            }

            if (password && newPassword) {
                if (newPassword !== passwordConfirm) {
                    show({
                        message: "New password doesn't match the confirm one",
                        intent: "warning",
                    });
                    return;
                }

                data.append("password", password);
                data.append("newPassword", newPassword);
            }

            const { data: outputData } = await axios({
                method: "POST",
                url: `http://localhost/api/${updateUserURL}/${currentUser?.id}`,
                data: data,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
                responseType: "json",
            });

            show({
                message: "User updated successfully",
                intent: "success",
            });

            fetchUser();
            console.log("\n\nData: ", outputData, "\n\n");
            // history.push("/dashboard");
        } catch (error) {
            console.error(error);
            show({ message: error.message, intent: "error" });
        }
    };

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
            // console.log("User: ", data.data);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user: currentUser,
        loading,
        onUserUpdate,
    };
};

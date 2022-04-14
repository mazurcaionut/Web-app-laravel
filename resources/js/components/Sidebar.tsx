import React, { useEffect, useState } from "react";
import {
    LogoContainer,
    LogoutButton,
    MiddleIcons,
    SidebarRoot,
} from "../styles/Sidebar.styles";
import { Icon, Position, Button, Spinner, mergeRefs } from "@blueprintjs/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Logo from "../../images/IdeaFactory.png";
import { Dialog } from "@blueprintjs/core";

interface IUser {
    id: number;
    name: string;
    email: string;
}

export const Sidebar = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data: responseUser } = await axios.get("/api/currentUser");

            console.log("\n\n", responseUser, "\n\n");

            setCurrentUser({
                id: responseUser.id,
                email: responseUser.email,
                name: responseUser.name,
            });
            // setPostsItems(response.map((item: { title: any }) => item.title));
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onLogoutButton = async () => {
        await axios
            .post("/logout")
            .then((response) => history.push("/login"))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const redirectTo = (newRoute: string) => () => history.push(newRoute);

    return (
        <SidebarRoot>
            <LogoContainer onClick={redirectTo("/")} />

            <MiddleIcons>
                <Icon
                    style={{ cursor: "pointer" }}
                    size={40}
                    icon="home"
                    onClick={redirectTo("/")}
                />

                <Icon
                    style={{ cursor: "pointer" }}
                    size={40}
                    icon="notifications"
                    onClick={redirectTo("/notifications")}
                />
                <Icon
                    style={{ cursor: "pointer" }}
                    size={40}
                    icon="edit"
                    onClick={redirectTo("/createPost")}
                />
            </MiddleIcons>
            {loading ? (
                <Spinner />
            ) : (
                <div onClick={() => setDialogOpen(true)}>
                    {currentUser?.name}
                </div>
            )}
            <LogoutButton onClick={onLogoutButton} size={40} icon="log-out" />
            <Dialog
                onClose={() => setDialogOpen(false)}
                isOpen={dialogOpen}
                style={{ width: "300px", height: "300px" }}
            ></Dialog>
        </SidebarRoot>
    );
};

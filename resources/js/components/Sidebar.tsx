import React, { useState } from "react";
import {
    AvatarImg,
    LogoContainer,
    LogoutButton,
    MiddleIcons,
    SidebarRoot,
    UserAvatar,
} from "../styles/Sidebar.styles";
import { Icon, Spinner } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { Dialog } from "@blueprintjs/core";
import { useLogout } from "../hooks/useLogout";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Avatar } from "./Avatar";

export const Sidebar = () => {
    const history = useHistory();
    const { user, loading } = useCurrentUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { loading: logOutLoading, logOut } = useLogout();

    const onLogoutButton = async () => await logOut();

    const redirectTo = (newRoute: string) => () => history.push(newRoute);

    const openProfileSettings = () => setDialogOpen(true);

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
                    onClick={redirectTo("/dashboard/create")}
                />
            </MiddleIcons>

            <Avatar user={user} openProfileSettings={openProfileSettings} />
            <LogoutButton onClick={onLogoutButton} size={40} icon="log-out" />
            <Dialog
                onClose={() => setDialogOpen(false)}
                isOpen={dialogOpen}
                style={{ width: "300px", height: "300px" }}
            ></Dialog>
        </SidebarRoot>
    );
};

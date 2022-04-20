import React, { useState } from "react";
import {
    AvatarImg,
    LogoContainer,
    LogoutButton,
    MiddleIcons,
    SidebarRoot,
    TabRoot,
    UserAvatar,
} from "../styles/Sidebar.styles";
import {
    Button,
    FileInput,
    FormGroup,
    Icon,
    InputGroup,
    Spinner,
    Tab,
    Tabs,
} from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { Dialog } from "@blueprintjs/core";
import { useLogout } from "../hooks/useLogout";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Avatar } from "./Avatar";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { ProfileView } from "./ProfileView";

export const Sidebar = () => {
    const history = useHistory();
    const { user, loading, onUserUpdate } = useCurrentUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { loading: logOutLoading, logOut } = useLogout();

    const onLogoutButton = async () => await logOut();

    const redirectTo = (newRoute: string) => () => history.push(newRoute);

    const openProfileSettings = () => setDialogOpen(true);

    const closeProfileSettings = () => setDialogOpen(false);

    return (
        <SidebarRoot>
            <LogoContainer onClick={redirectTo("/")} />

            <MiddleIcons>
                <Tooltip2 content="Home" placement="right">
                    <Icon
                        style={{ cursor: "pointer" }}
                        size={40}
                        icon="home"
                        onClick={redirectTo("/")}
                    />
                </Tooltip2>

                <Tooltip2 content="Notifications" placement="right">
                    <Icon
                        style={{ cursor: "pointer" }}
                        size={40}
                        icon="notifications"
                        onClick={redirectTo("/dashboard/notifications")}
                    />
                </Tooltip2>

                <Tooltip2 content="My posts" placement="right">
                    <Icon
                        style={{ cursor: "pointer" }}
                        size={40}
                        icon="applications"
                        onClick={redirectTo("/dashboard/myposts")}
                    />
                </Tooltip2>

                <Tooltip2 content="Create post" placement="right">
                    <Icon
                        style={{ cursor: "pointer" }}
                        size={40}
                        icon="edit"
                        onClick={redirectTo("/dashboard/create")}
                    />
                </Tooltip2>
            </MiddleIcons>

            <Tooltip2 content={user?.name} placement="right">
                <Avatar user={user} openProfileSettings={openProfileSettings} />
            </Tooltip2>

            <Tooltip2 content="Log out" placement="right">
                <LogoutButton
                    onClick={onLogoutButton}
                    size={40}
                    icon="log-out"
                />
            </Tooltip2>
            <ProfileView
                onUserUpdate={onUserUpdate}
                closeDialog={closeProfileSettings}
                user={user}
                dialogOpen={dialogOpen}
            />
        </SidebarRoot>
    );
};

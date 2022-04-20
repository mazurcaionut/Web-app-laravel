import {
    Button,
    Dialog,
    FileInput,
    FormGroup,
    Icon,
    InputGroup,
    Tab,
    Tabs,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { UpdateUserArgs } from "../hooks/useCurrentUser";
import { User } from "../hooks/useSinglePost";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    SaveChangesButton,
} from "../styles/ProfileView.styles";
import { TabRoot } from "../styles/Sidebar.styles";
import { Avatar } from "./Avatar";
import { PasswordTab } from "./PasswordTab";
import { ProfileInfoTab } from "./ProfileInfoTab";

interface ProfileViewProps {
    dialogOpen: boolean;
    closeDialog: () => void;
    user: User | null;
    onUserUpdate: (fields: UpdateUserArgs) => () => Promise<void>;
}

export const ProfileView = (props: ProfileViewProps) => {
    const { dialogOpen, closeDialog, user, onUserUpdate } = props;
    const [tab, setTab] = useState("info");
    const [localUser, setLocalUser] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);

    const handleTabChange = (tab: string) => setTab(tab);

    return (
        <DialogRoot onClose={closeDialog} isOpen={dialogOpen}>
            <DialogHeader>
                <Icon size={30} icon="user" />
                <h3>USER PROFILE</h3>
            </DialogHeader>

            <DialogContent>
                <TabRoot>
                    <Tabs
                        selectedTabId={tab}
                        onChange={handleTabChange}
                        animate
                        large
                    >
                        <Tab id="info" title="Profile info" />
                        <Tab id="password" title="Password" />
                    </Tabs>
                </TabRoot>

                {tab === "info" ? (
                    <ProfileInfoTab
                        closeDialog={closeDialog}
                        onUserUpdate={onUserUpdate}
                        user={user}
                    />
                ) : (
                    <PasswordTab
                        closeDialog={closeDialog}
                        onUserUpdate={onUserUpdate}
                    />
                )}
            </DialogContent>
        </DialogRoot>
    );
};

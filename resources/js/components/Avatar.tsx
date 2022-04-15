import { Spinner } from "@blueprintjs/core";
import React from "react";
import { IUser } from "../hooks/useCurrentUser";
import { AvatarImg, UserAvatar } from "../styles/Sidebar.styles";
import DefaultAvatar from "../../images/BlankPicture.png";

interface AvatarProps {
    user: IUser | null;
    loading?: boolean;
    size?: number;
    openProfileSettings?: () => void;
}

export const Avatar = ({
    user,
    loading = false,
    size = 40,
    openProfileSettings,
}: AvatarProps) => {
    return (
        <>
            {loading || !user ? (
                <Spinner />
            ) : (
                <UserAvatar
                    onClick={openProfileSettings ?? undefined}
                    size={size}
                >
                    <AvatarImg
                        alt={user.name ?? ""}
                        src={user.imageURL ?? DefaultAvatar}
                        size={size}
                    />
                </UserAvatar>
            )}
        </>
    );
};

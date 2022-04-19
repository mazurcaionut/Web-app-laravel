import { Spinner } from "@blueprintjs/core";
import React from "react";
import { AvatarImg, UserAvatar } from "../styles/Sidebar.styles";
import DefaultAvatar from "../../images/BlankPicture.png";
import { User } from "../hooks/useSinglePost";

interface AvatarProps {
    user: User | null;
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
                        src={user.image ?? DefaultAvatar}
                        size={size}
                    />
                </UserAvatar>
            )}
        </>
    );
};

import { Icon } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
// import { IUser } from "../hooks/useCurrentUser";
import { usePathname } from "../hooks/usePathname";
import { Post } from "../hooks/useSinglePost";
import {
    ListPostItemDescription,
    ListPostItemRoot,
    ListPostItemTitle,
    PostImage,
} from "../styles/ListPostItem.styles";
import { Avatar } from "./Avatar";

interface IListPostItem {
    post: Post;
    deletePost?: (id: number) => (e: any) => Promise<void>;
}

export const ListPostItem = (props: IListPostItem) => {
    const { post, deletePost } = props;
    const { user } = useCurrentUser();
    const history = useHistory();
    const pathname = usePathname();
    // const postDate = moment(post.created_at).format("Do MMMM YYYY");
    const postDate = moment(post.created_at).fromNow();

    // const user = {
    //     name: post.user.name,
    //     email: post.user.email,
    //     id: post.user.id,
    //     imageURL: post.user.image,
    // } as IUser;

    const goToPost = () => history.push(`/dashboard/${post.id}`);

    const goToEditPost = (e: any) => {
        e.stopPropagation();
        history.push(`/dashboard/myposts/${post.id}`);
    };

    return (
        <ListPostItemRoot onClick={goToPost}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    gap: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        alignItems: "center",
                    }}
                >
                    <Avatar user={post.user ?? null} />
                    <div>{post.user?.name}</div>
                    <div>{`| ${postDate}`}</div>
                </div>
                <ListPostItemTitle>{post.title}</ListPostItemTitle>
                <ListPostItemDescription rows={3}>
                    {post.description}
                </ListPostItemDescription>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                <PostImage image={post.image} />
                {pathname.includes("myposts") || user?.role === "Admin" ? (
                    <>
                        <Tooltip2 content="Edit post" placement="top">
                            <Icon
                                style={{ cursor: "pointer" }}
                                size={20}
                                icon="edit"
                                onClick={goToEditPost}
                            />
                        </Tooltip2>

                        <Tooltip2 content="Delete post" placement="top">
                            <Icon
                                style={{ cursor: "pointer" }}
                                size={20}
                                icon="trash"
                                onClick={
                                    deletePost ? deletePost(post.id) : undefined
                                }
                            />
                        </Tooltip2>
                    </>
                ) : null}
            </div>
        </ListPostItemRoot>
    );
};

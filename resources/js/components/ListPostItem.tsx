import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import { IUser } from "../hooks/useCurrentUser";
import {
    ListPostItemDescription,
    ListPostItemRoot,
    ListPostItemTitle,
    PostImage,
} from "../styles/ListPostItem.styles";
import { Avatar } from "./Avatar";

interface IListPostItem {
    post: any;
}

export const ListPostItem = (props: IListPostItem) => {
    const { post } = props;
    const history = useHistory();
    const postDate = moment(post.created_at).format("Do MMMM YYYY");

    const user = {
        name: post.user.name,
        email: post.user.email,
        id: post.user.id,
        imageURL: post.user.image,
    } as IUser;

    const goToPost = () => history.push(`/dashboard/${post.id}`);

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
                    <Avatar user={user} />
                    <div>{user.name}</div>
                    <div>{`| ${postDate}`}</div>
                </div>
                <ListPostItemTitle>{post.title}</ListPostItemTitle>
                <ListPostItemDescription>
                    {post.description}
                </ListPostItemDescription>
            </div>
            <PostImage image={post.image} />
        </ListPostItemRoot>
    );
};

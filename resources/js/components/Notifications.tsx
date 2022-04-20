import { InputGroup, Spinner } from "@blueprintjs/core";
import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentNotificationComment } from "../hooks/useCurrentNotificationComment";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNotifications } from "../hooks/useNotifications";
import { PageContentRoot } from "../styles/PageContent.styles";
import { Avatar } from "./Avatar";
import { Sidebar } from "./Sidebar";

export const Notifications = () => {
    const title = "Notifications";
    const [searchValue, setSearchValue] = useState("");
    const { notifications, loading } = useNotifications();
    const history = useHistory();
    const [commentIndex, setCommentIndex] = useCurrentNotificationComment();
    // const postDate = moment(post.created_at).fromNow();

    const onSearchValue = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);

    return (
        <>
            <Sidebar />
            <PageContentRoot>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {title ? <h1>{title}</h1> : null}
                    <InputGroup
                        required
                        type="search"
                        leftIcon="search"
                        value={searchValue}
                        onChange={onSearchValue}
                        // value={fields.email}
                        // onChange={handleChange("email")}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    {loading ? (
                        <Spinner />
                    ) : (
                        notifications
                            .filter((notification) =>
                                notification.content
                                    .toLowerCase()
                                    .includes(searchValue.toLowerCase())
                            )
                            .map((item, index) => (
                                <div
                                    onClick={() => {
                                        setCommentIndex(
                                            item.comment?.id ?? null
                                        );
                                        history.push(
                                            `/dashboard/${item.comment?.post_id}`
                                        );
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "5px",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div>{`${moment(
                                        item.created_at
                                    ).fromNow()} | `}</div>
                                    <Avatar user={item.comment?.user ?? null} />
                                    {/* <div>{item.comment?.user?.name}</div> */}
                                    <div>{item.content}</div>
                                </div>
                                // <ListPostItem
                                //     deletePost={deletePost}
                                //     key={index + 1}
                                //     post={item}
                                // />
                            ))
                    )}
                </div>
            </PageContentRoot>
        </>
    );
};

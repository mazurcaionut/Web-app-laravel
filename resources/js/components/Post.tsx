import { FormGroup, InputGroup, Button, Spinner } from "@blueprintjs/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Comment, useSinglePost } from "../hooks/useSinglePost";
import {
    ListPostItemDescription,
    ListPostItemTitle,
    PostImage,
} from "../styles/ListPostItem.styles";
import { PageContentRoot } from "../styles/PageContent.styles";
import { Sidebar } from "./Sidebar";
import imageDefault from "../../images/DefaultImage.jpg";
import moment from "moment";
import { Avatar } from "./Avatar";
import { CommentItem } from "./CommentItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AUTH_TOKEN } from "../storage";
import axios from "axios";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useToast } from "../hooks/useToast";
import { useCurrentNotificationComment } from "../hooks/useCurrentNotificationComment";

export const Post = () => {
    const { post, loading, fetchPost } = useSinglePost();
    const [token] = useLocalStorage(AUTH_TOKEN);
    const { user: currentUser } = useCurrentUser();
    const [commentIndex, setCommentIndex] = useCurrentNotificationComment();
    const show = useToast();
    const updateCommentURL = "comments/update";
    const createCommentURL = "comments/create";
    const deleteCommentURL = "comments/delete";
    const [showAddCommentForPost, setShowAddCommentForPost] = useState(false);
    const [postComment, setPostComment] = useState<string>("");
    const [localPostComments, setLocalPostComments] = useState<Comment[]>([]);
    const postDate = post
        ? moment(post.created_at).format("Do MMMM YYYY")
        : "Not found";

    useEffect(() => {
        setTimeout(() => {
            setCommentIndex(null);
        }, 5000);
    }, []);

    const onPostCommentChange = (event: ChangeEvent<HTMLInputElement>) =>
        setPostComment(event.target.value);

    const updateComment = (content: string, id: number) => async () => {
        const payload = {
            content,
        };

        try {
            const { data } = await axios({
                method: "POST",
                url: `http://localhost/api/${updateCommentURL}/${id}`,
                data: JSON.stringify(payload),
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                responseType: "json",
            });
            show({
                message: "Comment updated successfully",
                intent: "success",
            });

            fetchPost();
            console.log("\n\nData comment: ", data, "\n\n");
            setCommentIndex(id);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }
    };

    const deleteComment = (id: number) => async () => {
        try {
            const { data } = await axios({
                method: "DELETE",
                url: `http://localhost/api/${deleteCommentURL}/${id}`,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                responseType: "json",
            });
            show({
                message: "Comment deleted successfully",
                intent: "success",
            });

            fetchPost();
            console.log("\n\nData comment: ", data, "\n\n");
            setCommentIndex(id);
        } catch ({ message }) {
            show({ message, intent: "error" });
        }
    };

    const addComment =
        (commentable_type: string, commentable_id: number, content: string) =>
        async () => {
            const commentToAdd = {
                commentable_type,
                commentable_id,
                content,
                post_id: post?.id,
            };

            try {
                const { data } = await axios({
                    method: "POST",
                    url: `http://localhost/api/${createCommentURL}`,
                    data: JSON.stringify(commentToAdd),
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    responseType: "json",
                });
                show({
                    message: "Comment created successfully",
                    intent: "success",
                });

                fetchPost();
                setShowAddCommentForPost(false);
                setPostComment("");
                console.log("\n\nData comment: ", data, "\n\n");
            } catch ({ message }) {
                show({ message, intent: "error" });
            }
        };

    useEffect(() => {
        if (post && post.comments) {
            setLocalPostComments(post.comments);
        }
    }, [post]);

    return (
        <>
            <Sidebar />
            <PageContentRoot>
                {loading || !post ? (
                    <Spinner />
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
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
                            {post.user ? (
                                <>
                                    <Avatar user={post.user} />
                                    <div>{post.user.name}</div>
                                </>
                            ) : null}

                            <div>{`| ${postDate}`}</div>
                        </div>
                        <PostImage
                            height={300}
                            width={300}
                            image={post.image ?? imageDefault}
                        />
                        <ListPostItemTitle>{post.title}</ListPostItemTitle>
                        <ListPostItemDescription>
                            {post.description}
                        </ListPostItemDescription>
                        <ListPostItemTitle>{`Responses (${localPostComments.length})`}</ListPostItemTitle>
                        <Button
                            style={{ width: "300px" }}
                            onClick={() => {
                                setPostComment("");
                                setShowAddCommentForPost(
                                    !showAddCommentForPost
                                );
                            }}
                        >
                            Toggle Add Comment for Post
                        </Button>
                        {showAddCommentForPost ? (
                            <div
                                style={{
                                    border: "1px solid black",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    width: "300px",
                                    boxSizing: "border-box",
                                    padding: "10px",
                                }}
                            >
                                <FormGroup
                                    label="Comment content"
                                    labelInfo="(required)"
                                >
                                    <InputGroup
                                        required
                                        value={postComment}
                                        onChange={onPostCommentChange}
                                        // value={fields.email}
                                        // onChange={handleChange("email")}
                                    />
                                </FormGroup>
                                <Button
                                    onClick={addComment(
                                        "App\\Models\\Post",
                                        post.id,
                                        postComment
                                    )}
                                >
                                    Submit comment
                                </Button>
                            </div>
                        ) : null}
                        {localPostComments.map((comment) => (
                            <CommentItem
                                commentIndex={commentIndex}
                                post={post}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                comment={comment}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                )}
            </PageContentRoot>
        </>
    );
};

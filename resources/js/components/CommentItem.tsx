import { Button, FormGroup, Icon, InputGroup } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePathname } from "../hooks/usePathname";
import { Comment, Post, User } from "../hooks/useSinglePost";
import { CommentItemRoot } from "../styles/CommentItem.styles";
import { Avatar } from "./Avatar";

interface CommentItemProps {
    commentIndex: number | null;
    margin?: boolean;
    post: Post;
    comment: Comment;
    addComment: (
        commentable_type: string,
        commentable_id: number,
        content: string
    ) => () => Promise<void>;
    updateComment: (content: string, id: number) => () => Promise<void>;
    deleteComment: (id: number) => () => Promise<void>;
    currentUser: User | null;
}

export const CommentItem = (props: CommentItemProps) => {
    const {
        margin,
        commentIndex,
        post,
        comment,
        addComment,
        currentUser,
        updateComment,
        deleteComment,
    } = props;
    const pathname = usePathname();
    const [showReplies, setShowReplies] = useState(true);
    const [showAddCommentForComment, setShowAddCommentForComment] =
        useState(false);
    const [showUpdateCommentForComment, setShowUpdateCommentForComment] =
        useState(false);

    useEffect(() => {
        console.log("Post user id: ", post?.user?.id);
    }, [post]);

    const [currentCommentContent, setCurrentCommentContent] = useState(
        comment.content
    );
    const [commentComment, setCommentComment] = useState<string>("");

    const onCommentCommentChange = (event: ChangeEvent<HTMLInputElement>) =>
        setCommentComment(event.target.value);

    const onCommentContentCommentChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => setCurrentCommentContent(event.target.value);

    const hasComments = comment.comments && comment.comments.length > 0;
    const postDate = comment
        ? moment(comment.created_at).format("Do MMMM YYYY")
        : "Not found";

    const showRepliesToggle = () => setShowReplies(!showReplies);

    const scrollTo = (ref: HTMLDivElement | null) => {
        if (ref && commentIndex === comment.id) {
            ref.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <CommentItemRoot
            margin={margin}
            enableAnimation={commentIndex === comment.id}
            ref={scrollTo}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignItems: "center",
                }}
            >
                {comment.user ? (
                    <>
                        <Avatar user={comment.user} />
                        <div>{comment.user.name}</div>
                    </>
                ) : null}

                <div>{`| ${postDate}`}</div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {showUpdateCommentForComment ? (
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
                                value={currentCommentContent}
                                onChange={onCommentContentCommentChange}
                                // value={fields.email}
                                // onChange={handleChange("email")}
                            />
                        </FormGroup>
                        <Button
                            onClick={updateComment(
                                currentCommentContent,
                                comment.id
                            )}
                        >
                            Submit comment
                        </Button>
                    </div>
                ) : (
                    <div>{comment.content}</div>
                )}

                {comment.user?.id === currentUser?.id ||
                post?.user?.id === currentUser?.id ? (
                    <>
                        {!(post?.user?.id === (currentUser?.id as number)) ? (
                            <Tooltip2 content="Edit comment" placement="top">
                                <Icon
                                    style={{ cursor: "pointer" }}
                                    size={20}
                                    icon="edit"
                                    onClick={() =>
                                        setShowUpdateCommentForComment(
                                            !showUpdateCommentForComment
                                        )
                                    }
                                />
                            </Tooltip2>
                        ) : null}

                        <Tooltip2 content="Delete comment" placement="top">
                            <Icon
                                style={{ cursor: "pointer" }}
                                size={20}
                                icon="trash"
                                onClick={deleteComment(comment.id)}
                            />
                        </Tooltip2>
                    </>
                ) : null}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignItems: "center",
                }}
            >
                <div
                    onClick={hasComments ? showRepliesToggle : undefined}
                    style={{ cursor: hasComments ? "pointer" : "text" }}
                >
                    {showReplies && hasComments
                        ? "Hide replies"
                        : `${comment.comments?.length} replies`}
                </div>
                <Button
                    onClick={() => {
                        setCommentComment("");
                        setShowAddCommentForComment(!showAddCommentForComment);
                    }}
                >
                    Reply
                </Button>
            </div>

            {showAddCommentForComment ? (
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
                    <FormGroup label="Comment content" labelInfo="(required)">
                        <InputGroup
                            required
                            value={commentComment}
                            onChange={onCommentCommentChange}
                            // value={fields.email}
                            // onChange={handleChange("email")}
                        />
                    </FormGroup>
                    <Button
                        onClick={addComment(
                            "App\\Models\\Comment",
                            comment.id,
                            commentComment
                        )}
                    >
                        Submit comment
                    </Button>
                </div>
            ) : null}

            {showReplies && hasComments
                ? comment.comments?.map((innerComment) => (
                      <CommentItem
                          margin
                          commentIndex={commentIndex}
                          post={post}
                          comment={innerComment}
                          addComment={addComment}
                          updateComment={updateComment}
                          deleteComment={deleteComment}
                          currentUser={currentUser}
                      />
                  ))
                : null}
        </CommentItemRoot>
    );
};

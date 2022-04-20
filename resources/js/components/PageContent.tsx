import { InputGroup, Spinner } from "@blueprintjs/core";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { Post, User } from "../hooks/useSinglePost";
import { PageContentRoot } from "../styles/PageContent.styles";
import { ListPostItem } from "./ListPostItem";

interface IMainPage {
    posts: Post[];
    loading: boolean;
    title?: string;
    user: User | null;
    deletePost?: (id: number) => (e: any) => Promise<void>;
}

export const MainPageContent = (props: IMainPage) => {
    const { posts, loading, title, deletePost, user } = props;
    const [searchValue, setSearchValue] = useState("");

    const onSearchValue = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);

    return (
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
            {loading ? (
                <Spinner />
            ) : (
                posts
                    .filter((post) =>
                        post.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )
                    .map((item, index) => (
                        <ListPostItem
                            user={user}
                            deletePost={deletePost}
                            key={index + 1}
                            post={item}
                        />
                    ))
            )}
        </PageContentRoot>
    );
};

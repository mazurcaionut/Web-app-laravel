import { Spinner } from "@blueprintjs/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { PageContentRoot } from "../styles/PageContent.styles";
import { ListPostItem } from "./ListPostItem";

export const MainPageContent = () => {
    const { posts, loading } = usePosts();

    return (
        <PageContentRoot>
            {loading ? (
                <Spinner />
            ) : (
                posts.map((item, index) => (
                    <ListPostItem key={index + 1} post={item} />
                ))
            )}
        </PageContentRoot>
    );
};

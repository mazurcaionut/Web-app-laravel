import { Spinner } from "@blueprintjs/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageContentRoot } from "../styles/PageContent.styles";
import { ListPostItem } from "./ListPostItem";

export const MainPageContent = () => {
    const [postsItems, setPostsItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data: response } = await axios.get("/api/posts");
            const { data: responseUser } = await axios.get("/api/currentUser");

            console.log("\n\n", response, "\n\n");

            setPostsItems(response.map((item: { title: any }) => item.title));
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PageContentRoot>
            {loading ? (
                <Spinner />
            ) : (
                postsItems.map((item) => (
                    <ListPostItem key={item} text={item.toString()} />
                ))
            )}
        </PageContentRoot>
    );
};

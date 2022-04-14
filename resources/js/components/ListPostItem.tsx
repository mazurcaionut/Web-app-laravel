import React from "react";
import { ListPostItemRoot } from "../styles/ListPostItem.styles";

interface IListPostItem {
    text: string;
}

export const ListPostItem = (props: IListPostItem) => {
    const { text } = props;

    return <ListPostItemRoot>{text}</ListPostItemRoot>;
};

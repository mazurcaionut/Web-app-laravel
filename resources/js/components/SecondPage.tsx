import React from "react";
import { useHistory } from "react-router-dom";

export const SecondPage = () => {
    const history = useHistory();

    return <div onClick={() => history.push("/")}>Second Page</div>;
};

import React from "react";
import { useHistory } from "react-router-dom";

export const WelcomePage = () => {
    const history = useHistory();

    return <div onClick={() => history.push("secondPage")}>TEST</div>;
};

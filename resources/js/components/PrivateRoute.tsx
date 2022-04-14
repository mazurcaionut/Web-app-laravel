import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../storage";

export type PrivateRouteProps = RouteProps;

export const PrivateRoute = ({ component, path, exact }: PrivateRouteProps) => {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN);

        if (token) {
            setAuthenticated(true);
            history.push("/dashboard");
        } else {
            history.push("/login");
        }
    }, [history]);

    return authenticated ? (
        path === "/" ? (
            <Redirect to="/dashboard" />
        ) : (
            <Route component={component} path={path} exact={exact} />
        )
    ) : null;
};

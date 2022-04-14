import React, { useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import styled, { css } from "styled-components";
import { AppRoot } from "../styles/App.styles";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { PrivateRoute } from "./PrivateRoute";
// import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

export const NoMatch = styled.div(
    ({ theme }) => css`
        background: url("https://i.stack.imgur.com/6M513.png") no-repeat center
            center fixed;
        background-size: cover;
        flex: 1;
    `
);

export const NoMatchComponent = () => {
    return <Redirect to="/login" />;
};
export interface IUser {
    name: string;
    age: number;
}

const App = () => {
    return (
        <AppRoot>
            <Switch>
                {privateRoutes.map(({ component, path }, index) => (
                    <PrivateRoute
                        exact
                        key={index + 1}
                        path={path}
                        component={component}
                    />
                ))}

                {publicRoutes.map(({ component, path }, index) => (
                    <Route
                        exact
                        key={index + 1}
                        path={path}
                        component={component}
                    />
                ))}
                <Route component={NoMatchComponent} />
            </Switch>
        </AppRoot>
    );
};

export default App;

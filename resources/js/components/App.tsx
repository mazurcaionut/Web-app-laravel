import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { publicRoutes } from "../routes";
import styled, { css } from "styled-components";
import { AppRoot } from "../styles/App.styles";

export const NoMatch = styled.div(
    ({ theme }) => css`
        background: url("https://i.stack.imgur.com/6M513.png") no-repeat center
            center fixed;
        background-size: cover;
        flex: 1;
    `
);

export interface IUser {
    name: string;
    age: number;
}

const App = () => {
    return (
        <AppRoot>
            <Switch>
                {publicRoutes.map(({ component, path }, index) => (
                    <Route
                        exact
                        key={index + 1}
                        path={path}
                        component={component}
                    />
                ))}
                <Route component={NoMatch} />
            </Switch>
        </AppRoot>
    );
};

export default App;

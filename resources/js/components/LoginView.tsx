import { Button, FormGroup, Icon, InputGroup } from "@blueprintjs/core";
import React from "react";
import {
    FormContainer,
    GuestPageLogo,
    GuestPageRoot,
} from "../styles/LoginView.styles";

export const LoginView = () => {
    return (
        <GuestPageRoot>
            <GuestPageLogo />
            <FormContainer>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon size={40} icon="person" />
                    <h1>Sign in</h1>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "black",
                    }}
                />
                <FormGroup label="Email address" labelInfo="(required)">
                    <InputGroup />
                </FormGroup>
                <FormGroup label="Password" labelInfo="(required)">
                    <InputGroup type="password" />
                </FormGroup>
                <div>
                    <a href="/register">Not a user? Create an account</a>
                </div>
                <Button icon="log-in">Sign in</Button>
            </FormContainer>
        </GuestPageRoot>
    );
};

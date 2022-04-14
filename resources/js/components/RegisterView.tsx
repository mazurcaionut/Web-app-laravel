import { Icon, FormGroup, InputGroup, Button } from "@blueprintjs/core";
import React from "react";
import {
    FormContainer,
    GuestPageLogo,
    GuestPageRoot,
} from "../styles/LoginView.styles";

export const RegisterView = () => {
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
                    <Icon size={40} icon="new-person" />
                    <h1>Sign up</h1>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "black",
                    }}
                />
                <FormGroup label="Name" labelInfo="(required)">
                    <InputGroup />
                </FormGroup>
                <FormGroup label="Email address" labelInfo="(required)">
                    <InputGroup />
                </FormGroup>
                <FormGroup label="Password" labelInfo="(required)">
                    <InputGroup type="password" />
                </FormGroup>
                <FormGroup label="Password confirm" labelInfo="(required)">
                    <InputGroup type="password" />
                </FormGroup>
                <div>
                    <a href="/login">Already have an account? Sign in</a>
                </div>
                <Button icon="new-person">Create account</Button>
            </FormContainer>
        </GuestPageRoot>
    );
};

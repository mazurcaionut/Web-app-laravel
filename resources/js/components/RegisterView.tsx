import { Icon, FormGroup, InputGroup, Button } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import {
    FormContainer,
    GuestPageLogo,
    GuestPageRoot,
} from "../styles/LoginView.styles";
import { useSignUp } from "../hooks/useSignUp";
import { LockIcon, UnlockIcon } from "../styles/ProfileView.styles";

export interface IUserRegistration {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const RegisterView = () => {
    const { signUp, loading } = useSignUp();
    const [showPassword, setShowPassword] = useState<string>("none");

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [fields, setFields] = useState<IUserRegistration>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const onEyeClick = (field: string) => () =>
        showPassword === field
            ? setShowPassword("none")
            : setShowPassword(field);

    const lockButton = (field: string) => (
        <LockIcon size={20} onClick={onEyeClick(field)} />
    );

    const unlockButton = (field: string) => (
        <UnlockIcon size={20} onClick={onEyeClick(field)} />
    );

    const handleChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, [field]: event.target.value });

    const handleSubmit = async () => await signUp(fields);

    useEffect(() => {
        fields.email == "" ||
        fields.name == "" ||
        fields.password == "" ||
        fields.password_confirmation == ""
            ? setDisableSubmit(true)
            : setDisableSubmit(false);
    }, [fields]);

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
                    <InputGroup
                        value={fields.name}
                        onChange={handleChange("name")}
                        required
                    />
                </FormGroup>
                <FormGroup label="Email address" labelInfo="(required)">
                    <InputGroup
                        value={fields.email}
                        onChange={handleChange("email")}
                        required
                    />
                </FormGroup>
                <FormGroup label="Password" labelInfo="(required)">
                    <InputGroup
                        value={fields.password}
                        onChange={handleChange("password")}
                        // type="password"
                        // required
                        type={showPassword === "password" ? "text" : "password"}
                        rightElement={
                            showPassword !== "password"
                                ? unlockButton("password")
                                : lockButton("password")
                        }
                    />
                </FormGroup>
                <FormGroup label="Password confirmation" labelInfo="(required)">
                    <InputGroup
                        value={fields.password_confirmation}
                        onChange={handleChange("password_confirmation")}
                        // type="password"
                        // required
                        type={
                            showPassword === "password_confirmation"
                                ? "text"
                                : "password"
                        }
                        rightElement={
                            showPassword !== "password_confirmation"
                                ? unlockButton("password_confirmation")
                                : lockButton("password_confirmation")
                        }
                    />
                </FormGroup>
                <div>
                    <a href="/login">Already have an account? Sign in</a>
                </div>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={disableSubmit}
                    icon="new-person"
                >
                    Create account
                </Button>
            </FormContainer>
        </GuestPageRoot>
    );
};

import { Button, FormGroup, Icon, InputGroup } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
    FormContainer,
    GuestPageLogo,
    GuestPageRoot,
} from "../styles/LoginView.styles";
import { LockIcon, UnlockIcon } from "../styles/ProfileView.styles";

export interface IUserLogin {
    email: string;
    password: string;
}

export const LoginView = () => {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [showPassword, setShowPassword] = useState<string>("none");

    const { loading, login } = useLogin();

    const [fields, setFields] = useState<IUserLogin>({
        email: "",
        password: "",
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

    const handleSubmit = async () => await login(fields);

    const handleChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, [field]: event.target.value });

    useEffect(() => {
        fields.email == "" || fields.password == ""
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
                    <InputGroup
                        required
                        value={fields.email}
                        onChange={handleChange("email")}
                    />
                </FormGroup>
                <FormGroup label="Password" labelInfo="(required)">
                    <InputGroup
                        required
                        value={fields.password}
                        onChange={handleChange("password")}
                        // type="password"
                        type={showPassword === "password" ? "text" : "password"}
                        rightElement={
                            showPassword !== "password"
                                ? unlockButton("password")
                                : lockButton("password")
                        }
                    />
                </FormGroup>
                <div>
                    <a href="/register">Not a user? Create an account</a>
                </div>
                <Button
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={disableSubmit}
                    icon="log-in"
                >
                    Sign in
                </Button>
            </FormContainer>
        </GuestPageRoot>
    );
};

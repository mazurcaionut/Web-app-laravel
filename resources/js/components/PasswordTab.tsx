import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { UpdateUserArgs } from "../hooks/useCurrentUser";
import {
    DialogFooter,
    LockIcon,
    SaveChangesButton,
    UnlockIcon,
} from "../styles/ProfileView.styles";
// import {
//     BsEyeFill as LockIcon,
//     BsEyeSlashFill as UnlockIcon,
// } from "react-icons/bs";

export interface Passwords {
    old: string | undefined;
    new: string | undefined;
    confirm: string | undefined;
}

const initialValues = {
    old: undefined,
    new: undefined,
    confirm: undefined,
} as Passwords;

interface PasswordTabProps {
    onUserUpdate: (fields: UpdateUserArgs) => () => Promise<void>;
    closeDialog: () => void;
}

export const PasswordTab = (props: PasswordTabProps) => {
    const { onUserUpdate, closeDialog } = props;
    const [showPassword, setShowPassword] = useState<string>("none");
    const [passwordCheck, setPasswordCheck] =
        useState<Passwords>(initialValues);

    const handlePasswordChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordCheck({ ...passwordCheck, [field]: event.target.value });

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

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}
            >
                <FormGroup label="Current password">
                    <InputGroup
                        required
                        // value={fields.password}
                        value={passwordCheck.old}
                        onChange={handlePasswordChange("old")}
                        type={showPassword === "old" ? "text" : "password"}
                        rightElement={
                            showPassword !== "old"
                                ? unlockButton("old")
                                : lockButton("old")
                        }
                    />
                </FormGroup>
                <FormGroup label="New password">
                    <InputGroup
                        value={passwordCheck.new}
                        required
                        // value={fields.password}
                        // onChange={handleChange("password")}
                        onChange={handlePasswordChange("new")}
                        type={showPassword === "new" ? "text" : "password"}
                        rightElement={
                            showPassword !== "new"
                                ? unlockButton("new")
                                : lockButton("new")
                        }
                    />
                </FormGroup>
                <FormGroup label="Confirm new password">
                    <InputGroup
                        required
                        value={passwordCheck.confirm}
                        onChange={handlePasswordChange("confirm")}
                        //
                        // onChange={handleChange("password")}
                        type={showPassword === "confirm" ? "text" : "password"}
                        rightElement={
                            showPassword !== "confirm"
                                ? unlockButton("confirm")
                                : lockButton("confirm")
                        }
                    />
                </FormGroup>
            </div>
            <DialogFooter>
                <Button onClick={closeDialog}>Cancel</Button>
                <SaveChangesButton
                    disabled={
                        passwordCheck.old === "" ||
                        passwordCheck.new === "" ||
                        passwordCheck.confirm === ""
                    }
                    onClick={onUserUpdate({
                        password: passwordCheck.old,
                        newPassword: passwordCheck.new,
                        passwordConfirm: passwordCheck.confirm,
                    })}
                >
                    Save changes
                </SaveChangesButton>
            </DialogFooter>
        </>
    );
};

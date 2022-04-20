import { Button, FileInput, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UpdateUserArgs } from "../hooks/useCurrentUser";
import { User } from "../hooks/useSinglePost";
import { DialogFooter, SaveChangesButton } from "../styles/ProfileView.styles";
import { Avatar } from "./Avatar";

interface ProfileInfoTabProps {
    user: User | null;
    onUserUpdate: (fields: UpdateUserArgs) => () => Promise<void>;
    closeDialog: () => void;
}

interface InfoItems {
    name: string;
    email: string;
    imageURL: string;
    imageFile?: FileList;
    filename: string;
}

export const ProfileInfoTab = (props: ProfileInfoTabProps) => {
    const { user, closeDialog, onUserUpdate } = props;
    const [fields, setFields] = useState<InfoItems>({
        name: "",
        email: "",
        imageURL: "",
        filename: "",
        imageFile: undefined,
    });

    useEffect(() => {
        if (user) {
            setFields({
                name: user.name,
                email: user.email,
                imageURL: user.image ?? "",
                filename: "",
                imageFile: undefined,
            });
        }
    }, [user]);

    const handleChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, [field]: event.target.value });

    const onFileChange = ({
        target: { files },
    }: ChangeEvent<HTMLInputElement>) => {
        const fileName = files ? files[0].name : "";
        setFields({
            ...fields,
            imageFile: files && files[0] ? files : fields.imageFile,
            filename: fileName,
            imageURL:
                files && files[0]
                    ? URL.createObjectURL(files[0])
                    : fields.imageURL,
        });
    };

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
                <FormGroup label="Display name">
                    <InputGroup
                        required
                        value={fields.name}
                        onChange={handleChange("name")}
                        type="text"
                    />
                </FormGroup>
                <FormGroup label="Email">
                    <InputGroup
                        required
                        value={fields.email}
                        onChange={handleChange("email")}
                        type="text"
                    />
                </FormGroup>
                {/* <input
                accept=".png,.jpeg,.jpg"
                type="file"
            /> */}
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <FormGroup style={{ width: "100%" }} label="Avatar">
                        <FileInput
                            fill
                            text={
                                fields.imageFile === undefined
                                    ? "Choose a file..."
                                    : fields.filename
                            }
                            onInputChange={onFileChange}
                            inputProps={{
                                accept: "image/x-png, image/gif, image/jpeg",
                            }}
                        />
                    </FormGroup>
                    <Avatar
                        user={
                            fields.imageURL !== "" && user
                                ? { ...user, image: fields.imageURL }
                                : user
                        }
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={closeDialog}>Cancel</Button>
                <SaveChangesButton
                    disabled={fields.email === "" || fields.name === ""}
                    onClick={onUserUpdate({
                        name: fields.name,
                        email: fields.email,
                        image: fields.imageFile,
                    })}
                >
                    Save changes
                </SaveChangesButton>
            </DialogFooter>
        </>
    );
};

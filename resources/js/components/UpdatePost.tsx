import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageContentRoot } from "../styles/PageContent.styles";
import { MainPageContent } from "./PageContent";
import { Sidebar } from "./Sidebar";
import imageDefault from "../../images/DefaultImage.jpg";
import { PostImage } from "../styles/ListPostItem.styles";
import { useToast } from "../hooks/useToast";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AUTH_TOKEN } from "../storage";
import { useSinglePost } from "../hooks/useSinglePost";

export interface IPost {
    title: string;
    description: string;
    image?: FileList;
    localUrl?: string;
}

const initialFieldState: IPost = {
    title: "",
    description: "",
    image: undefined,
    localUrl: undefined,
};

export const UpdatePost = () => {
    const [fields, setFields] = useState<IPost>(initialFieldState);
    const { post } = useSinglePost();
    const history = useHistory();
    const show = useToast();
    const updatePostURL = "posts/update";
    const [token] = useLocalStorage(AUTH_TOKEN);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (post) {
            setFields({
                title: post?.title,
                description: post?.description,
                localUrl: post.image,
                image: undefined,
            });
        }
    }, [post]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current?.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [fields.description]);

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFields({ ...fields, title: event.target.value });

    const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setFields({ ...fields, description: event.target.value });

    const onFileChange = ({
        target: { files },
    }: ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            image: files && files[0] ? files : fields.image,
            localUrl:
                files && files[0]
                    ? URL.createObjectURL(files[0])
                    : fields.localUrl,
        });
    };

    const onUpdatePost = async () => {
        try {
            const { title, description, image } = fields;

            const data = new FormData();

            data.append("title", title);
            data.append("description", description);

            if (image) {
                data.append("image", image[0]);
            }

            const { data: outputData } = await axios({
                method: "POST",
                url: `http://localhost/api/${updatePostURL}/${post?.id}`,
                data: data,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
                responseType: "json",
            });

            show({
                message: "Post updated successfully",
                intent: "success",
            });

            console.log("\n\nData: ", outputData, "\n\n");
            history.push("/dashboard");
        } catch (error) {
            console.error(error);
            show({ message: error.message, intent: "error" });
        }
    };

    return (
        <>
            <Sidebar />
            <PageContentRoot>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <FormGroup label="Post title" labelInfo="(required)">
                        <InputGroup
                            required
                            value={fields.title}
                            onChange={onTitleChange}
                        />
                    </FormGroup>
                    <FormGroup label="Post description" labelInfo="(required)">
                        <textarea
                            ref={textAreaRef}
                            style={{
                                width: "100%",
                                resize: "none",
                                overflow: "hidden",
                                display: "block",
                            }}
                            onChange={onDescriptionChange}
                            value={fields.description}
                        />
                    </FormGroup>
                    <input
                        onChange={onFileChange}
                        accept=".png,.jpeg,.jpg"
                        type="file"
                    />
                    <PostImage
                        height={300}
                        width={300}
                        image={fields.localUrl ?? imageDefault}
                    />

                    <Button
                        disabled={
                            fields.description === "" ||
                            fields.title === "" ||
                            fields.localUrl === ""
                        }
                        onClick={onUpdatePost}
                        icon="log-in"
                    >
                        Update post
                    </Button>
                </div>
            </PageContentRoot>
        </>
    );
};

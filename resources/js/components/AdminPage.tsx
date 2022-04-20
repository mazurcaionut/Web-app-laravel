import { InputGroup, Spinner } from "@blueprintjs/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useToast } from "../hooks/useToast";
import { PageContentRoot } from "../styles/PageContent.styles";
import { Sidebar } from "./Sidebar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUsers } from "../hooks/useUsers";
import moment from "moment";
import { AvatarImg, UserAvatar } from "../styles/Sidebar.styles";
import DefaultAvatar from "../../images/BlankPicture.png";
import { DataGridWrapper } from "../styles/MainPage.styles";

interface TableRow {
    id: number;
    name: string;
    email: string;
    role: string;
    joined: string;
    image: string;
}

export const AdmingPage = () => {
    const { user, loading } = useCurrentUser();
    const { users, loading: usersLoading } = useUsers();
    const title = "Admin page";
    const [searchValue, setSearchValue] = useState("");
    const [rows, setRows] = useState<TableRow[]>([]);
    const history = useHistory();
    const show = useToast();
    const [pageSizeOption, setPageSizeOption] = useState(15);

    const onSearchValue = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);

    useEffect(() => {
        if (users && !usersLoading) {
            setRows(
                users.map((item) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    joined: moment(item.created_at).fromNow(),
                    image: item.image ?? DefaultAvatar,
                }))
            );
        }
    }, [users, usersLoading]);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "image",
            headerName: "Avatar",
            flex: 1,
            renderCell: (params) => (
                <UserAvatar onClick={undefined} size={30}>
                    <AvatarImg
                        alt={params.row.name}
                        src={params.value}
                        size={30}
                    />
                </UserAvatar>
            ),
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1.5,
        },
        {
            field: "joined",
            headerName: "Joined",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ] as GridColDef[];

    useEffect(() => {
        if (user) {
            if (user.role !== "Admin") {
                history.push("/dashboard");
                show({
                    message: "You are not authorized to enter this page",
                    intent: "warning",
                });
            }
        }
    }, [user]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Sidebar />
                    <PageContentRoot>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {title ? <h1>{title}</h1> : null}
                            <InputGroup
                                required
                                type="search"
                                leftIcon="search"
                                value={searchValue}
                                onChange={onSearchValue}
                            />
                        </div>
                        <DataGridWrapper>
                            {usersLoading ? (
                                <Spinner />
                            ) : (
                                <DataGrid
                                    filterModel={{
                                        items: [
                                            {
                                                id: 1,
                                                columnField: "name",
                                                operatorValue: "contains",
                                                value: searchValue,
                                            },
                                        ],
                                    }}
                                    rows={rows}
                                    columns={columns}
                                    pageSize={pageSizeOption}
                                    onPageSizeChange={(pageSize) =>
                                        setPageSizeOption(pageSize)
                                    }
                                    rowsPerPageOptions={[5, 10, 15]}
                                />
                            )}
                        </DataGridWrapper>
                    </PageContentRoot>
                </>
            )}
        </>
    );
};

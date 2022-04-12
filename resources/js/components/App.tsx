import React, { useState } from "react";
import styled, { css } from "styled-components";
// import { }
import { useHistory } from "react-router-dom";

export const RootDiv = styled.div(
    ({ theme }) => css`
        background-color: green;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 20px;
    `
);

export interface IUser {
    name: string;
    age: number;
}
const App = () => {
    const history = useHistory();
    const [count, setCount] = useState(0);

    const [users] = useState<IUser[]>([
        {
            name: "Bijaya",
            age: 25,
        },
        {
            name: "Ram",
            age: 25,
        },
    ]);

    // const redirectTo = (newRoute: string) => () => history.push(newRoute);

    return (
        <RootDiv>
            <button>
                <a href="/posts">Posts</a>
            </button>
            <button onClick={() => setCount(count + 1)}>
                Comments {count}
            </button>
            {/* <h1>Users list</h1>
            <ul>
                {users.map((user: IUser) => {
                    return (
                        <li key={user.name}>
                            {user.name} is {user.age} years old
                        </li>
                    );
                })}
            </ul> */}
        </RootDiv>
    );
};

export default App;

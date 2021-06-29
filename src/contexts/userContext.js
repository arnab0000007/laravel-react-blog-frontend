import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();
function UserContextProvider(props) {
    const [loggedInUser, setLoggedInUser] = useState({});
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
            const signInUser = {
                isLoggedIn: true,
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                website: user.website,
            };
            setLoggedInUser(signInUser);
        } else {
            const signInUser = {
                isLoggedIn: false,
            };
            setLoggedInUser(signInUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContextProvider;

import React, { useContext, useState, useEffect,createContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import RegisterForm from "./RegisterForm";
export const RegisterContext = createContext()
function Register() {

    const { setLoggedInUser, loggedInUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    useEffect(() => {
        if (loggedInUser.isLoggedIn === true) {
            history.push("/profile");
        }
    }, [loggedInUser.isLoggedIn,history]);

    async function signUp(event) {
        event.preventDefault();
        let userDetails = { username, email, password, website, name };
        let result = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        result = await result.json();
        console.log(result);
        if (result.username) {
            localStorage.setItem("userInfo", JSON.stringify(result));
            const signInUser = {
                isLoggedIn: true,
                id: result.id,
                username: result.username,
                email: result.email,
                name: result.name,
                website: result.website,
            };
            setLoggedInUser(signInUser);
            history.push("/profile");
        } else {
            alert("Plsease Provide All Data Correctly");
        }
    }
    return (
    <RegisterContext.Provider value={{signUp,username,password,setUsername,email,setEmail,name,setName,website,setWebsite,setPassword}}>
        <RegisterForm/>
    </RegisterContext.Provider>
    );
}

export default Register;

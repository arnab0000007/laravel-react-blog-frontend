import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import LoginForm from "./LoginForm";
export const LoginContext = createContext();
function Login() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    if (loggedInUser.isLoggedIn) {
      history.push("/profile");
    }
  });
  const history = useHistory();
  const [emailOrUsername, setemailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  async function logIn(event) {
    event.preventDefault();
    let userDetails = { emailOrUsername, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    
    if (result.error) {
      alert(result.error);
    } else {
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
    }
  }
  return (
    <LoginContext.Provider
      value={{
        logIn,
        emailOrUsername,
        setemailOrUsername,
        password,
        setPassword,
      }}
    >
      <LoginForm />
    </LoginContext.Provider>
  );
}

export default Login;

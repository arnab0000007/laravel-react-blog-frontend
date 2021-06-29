import React, { createContext } from "react";
import Header from "./components/Partials/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import User from "./components/User/User";
import AddPost from "./components/Post/AddPost";
import UpdatePost from "./components/Post/UpdatePost";
import SinglePost from "./components/Post/SinglePost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContextProvider from "./contexts/userContext";
import PostContextProvider from "./contexts/postContext";
import UserProfile from "./components/User/UserProfile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
export const Context = createContext();
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <PostContextProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/user"
                component={User}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/user/profile/:id"
                component={UserProfile}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/add/post"
                component={AddPost}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/update/post/:id"
                component={UpdatePost}
              ></ProtectedRoute>
              <ProtectedRoute
                exact
                path="/single/post/:id"
                component={SinglePost}
              ></ProtectedRoute>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </BrowserRouter>
        </PostContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;

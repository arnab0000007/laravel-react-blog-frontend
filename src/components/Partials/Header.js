import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../contexts/userContext";
import { Link, useHistory } from "react-router-dom";
import "./header.css";
function Header() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const history = useHistory();
    function logOut() {
        localStorage.clear();
        history.push("/login");
        const signInUser = {
            isLoggedIn: false,
        };
        setLoggedInUser(signInUser);
    }
    return (
        <div className="header">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto link-style">
                        <Link to="/">All Post</Link>
                        {loggedInUser.isLoggedIn ? (
                            <>
                                <Link to="/profile">Profile</Link>
                                <Link to="/user">All User</Link>
                                <Link to="/add/post">Add Post</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </Nav>
                    {loggedInUser.isLoggedIn ? (
                        <>
                            <NavDropdown
                                title={loggedInUser && loggedInUser.username}
                            >
                                <NavDropdown.Item
                                    className="link-style1"
                                    onClick={logOut}
                                >
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : null}
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;

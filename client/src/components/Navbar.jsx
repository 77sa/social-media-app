import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import "./navbar.css";

const Navbar = ({ history }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);

        loggedIn && history.location.pathname === "/" && history.push("/home");
    });

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser({ username: "" });
        setLoggedIn(false);
        history.push("/login");
    };

    return (
        <nav className="sticky">
            <div className="logo">
                <h1>
                    {loggedIn ? (
                        <Link to="/home">Social Media App</Link>
                    ) : (
                        <p>Social Media App</p>
                    )}
                </h1>
            </div>

            {loggedIn && (
                <div className="links">
                    <ul>
                        <li>
                            {history.location.pathname !==
                                `/profile/${currentUser.username}` && (
                                <Link
                                    className="nav-profile"
                                    to={`/profile/${currentUser.username}`}
                                >
                                    {currentUser.username}
                                </Link>
                            )}
                        </li>
                    </ul>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{
                            fontWeight: "600",
                            marginLeft: "5px",
                            boxShadow: "none",
                        }}
                        className="logout"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

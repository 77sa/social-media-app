import React, { useContext, useEffect, useState } from "react";
import { UserContext, AuthContext } from "../Context";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const Login = ({ history }) => {
    const { authMessage, setAuthMessage } = useContext(AuthContext);
    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push("/");
        }
    }, [history]);

    const [user, setUser, handleChange] = useForm({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/auth/login", user);
            setIsLoading(false);
            setCurrentUser({ username: user.username });
            localStorage.setItem("token", data.token);
            history.push("/home");
        } catch (error) {
            setIsLoading(false);
            setAuthMessage("");
            setUser({ username: "", password: "" });
            setError(error.response.data.message);
        }
    };

    return (
        <div className="center">
            <div className="form-container">
                <form onSubmit={submit}>
                    <h2>Login</h2>
                    {error && <span>{error}</span>}
                    {authMessage && <span>{authMessage}</span>}
                    <div>
                        <TextField
                            id="filled-basic"
                            variant="filled"
                            size="small"
                            style={{ width: "100%" }}
                            type="text"
                            name="username"
                            label="Username"
                            required
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="filled-basic"
                            variant="filled"
                            size="small"
                            style={{ width: "100%" }}
                            type="password"
                            name="password"
                            label="Password"
                            required
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "5px" }}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <span>
                        Need an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;

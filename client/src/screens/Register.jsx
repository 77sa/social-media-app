import React, { useContext, useState } from "react";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const Register = ({ history }) => {
    const { setAuthMessage } = useContext(AuthContext);

    const [user, setUser, handleChange] = useForm({
        email: "",
        username: "",
        password: "",
        password2: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { email, username, password, password2 } = user;

        if (password !== password2) {
            setUser({ ...user, password: "", password2: "" });
            setIsLoading(false);
            return setError("Passwords do not match");
        }
        try {
            const { data } = await axios.post("/api/auth/register", {
                email,
                username,
                password,
            });
            if (!data.success) {
                return setError(data.message);
            }
            setAuthMessage("You can now log in");
            history.push("/login");
            setIsLoading(false);
        } catch (error) {
            // bug
            setIsLoading(false);
            setError(error.response.data.message);
        }
    };
    return (
        <div className="center">
            <div className="form-container">
                <form onSubmit={submit}>
                    <h2>Register</h2>
                    {error && <span>{error}</span>}
                    <div>
                        <TextField
                            id="filled-basic"
                            variant="filled"
                            size="small"
                            style={{ width: "100%" }}
                            type="email"
                            name="email"
                            label="Email"
                            required
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div>
                        <TextField
                            id="filled-basic"
                            variant="filled"
                            size="small"
                            style={{ width: "100%" }}
                            type="password"
                            name="password2"
                            label="Confirm password"
                            required
                            value={user.password2}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "5px" }}
                    >
                        Register
                    </Button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Register;

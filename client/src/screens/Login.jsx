import React, { useContext, useEffect, useState } from "react";
import { UserContext, AuthContext } from "../Context";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ history }) => {
  const { authMessage, setAuthMessage } = useContext(AuthContext);
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
  // set user afer login, use component state for login function
  const { setCurrentUser } = useContext(UserContext);

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
    <div>
      <form onSubmit={submit}>
        <h2>Login</h2>
        {error && <span>{error}</span>}
        {authMessage && <span>{authMessage}</span>}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            required
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <span>
          Need an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

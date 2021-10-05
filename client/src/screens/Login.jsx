import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { login } from "../utils/login";
import useForm from "../hooks/useForm";

const Login = ({ history }) => {
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
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(user.username, user.password);
      setIsLoading(false);
      setCurrentUser(user.username);
      localStorage.setItem("token", "token");
      history.push("/");
    } catch (error) {
      setIsLoading(false);
      setUser({ username: "", password: "" });
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Login</h2>
        {error && <span>{error}</span>}
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
      </form>
    </div>
  );
};

export default Login;

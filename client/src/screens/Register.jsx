import React, { useContext } from "react";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context";

const Register = ({ history }) => {
  const { authMessage, setAuthMessage } = useContext(AuthContext);
  const [user, setUser, handleChange] = useForm({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useForm("");

  const submit = async (e) => {
    e.preventDefault();

    const { email, username, password, password2 } = user;

    if (password !== password2) {
      setUser({ ...user, password: "", password2: "" });
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
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Register</h2>
        {error && <span>{error}</span>}
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            required
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username: </label>
          <input
            type="text"
            required
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            required
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password2">Comfirm password: </label>
          <input
            type="password"
            required
            name="password2"
            value={user.password2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

import React from "react";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser, handleChange] = useForm({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useForm("");

  const submit = (e) => {
    e.preventDefault();

    const { email, username, password, password2 } = user;

    if (password !== password2) return setError("Passwords do not match");

    try {
      // axios post
    } catch (error) {
      // set error response
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Register</h2>
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
